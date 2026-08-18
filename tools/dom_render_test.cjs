const fs = require('fs');
const vm = require('vm');

let bookGridHtml = '';
function el(id = '') {
  const node = {
    _html: '', textContent: '', href: '', hidden: false, style: {}, files: [], dataset: {}, isConnected: true,
    classList: { toggle: () => false, remove: () => {}, add: () => {} },
    setAttribute: () => {}, addEventListener: () => {}, querySelector: () => el(), querySelectorAll: () => [], closest: () => null
  };
  Object.defineProperty(node, 'innerHTML', {
    get() { return this._html; },
    set(value) { this._html = value; if (id === 'bookGrid') bookGridHtml = value; }
  });
  return node;
}

class MockImage {
  constructor() { this.naturalWidth = 320; this.naturalHeight = 480; this.width = 320; this.height = 480; }
  addEventListener(type, cb) { if (type === 'load') this.load = cb; if (type === 'error') this.error = cb; }
  set src(value) { this._src = value; setTimeout(() => this.error?.(), 0); }
}

const nodes = new Map();
const getNode = id => nodes.get(id) || nodes.set(id, el(id)).get(id);

const context = {
  console,
  setTimeout,
  FileReader: class { addEventListener(type, cb) { this[type] = cb; } readAsDataURL() { this.result = 'data:image/png;base64,file'; this.load(); } },
  Image: MockImage,
  localStorage: { getItem: () => null, setItem: () => {} },
  window: { location: { protocol: 'http:', origin: 'http://localhost' }, jspdf: { jsPDF: class {} }, pdfjsLib: null },
  document: {
    baseURI: 'http://localhost/index.html',
    body: { style: {} },
    getElementById: id => getNode(id),
    querySelector: selector => selector === '[data-count="books"]' ? getNode('count') : el(),
    querySelectorAll: () => [],
    addEventListener: () => {},
    createElement: tag => tag === 'canvas'
      ? { width: 0, height: 0, getContext: () => ({ drawImage: () => {} }), toDataURL: () => 'data:image/png;base64,pdf-page' }
      : el()
  },
  fetch: async () => ({ ok: false, json: async () => ({}) }),
  URL,
  Set,
  Promise,
  Error
};
context.pdfjsLib = null;

vm.createContext(context);
vm.runInContext(fs.readFileSync('script.js', 'utf8'), context);

if (!bookGridHtml.includes('class="cover book-cover-image"')) throw new Error('book cards do not use image cover container');
if (!bookGridHtml.includes('<img src="data:image/svg+xml')) throw new Error('book cards do not start with safe placeholder image');
if (!bookGridHtml.includes('data-cover-index="0"')) throw new Error('book cover hydration index missing');
const coverIndex = bookGridHtml.indexOf('book-cover-image');
const detailsIndex = bookGridHtml.indexOf('book-details');
const titleIndex = bookGridHtml.indexOf('<h3>');
if (!(coverIndex > -1 && coverIndex < detailsIndex && coverIndex < titleIndex)) throw new Error('cover is not rendered before book details/title');
if (bookGridHtml.includes('src=""')) throw new Error('empty image src could show broken image');
console.log('DOM render smoke test passed');
