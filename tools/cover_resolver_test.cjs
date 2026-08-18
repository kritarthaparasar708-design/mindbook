const fs = require('fs');
const vm = require('vm');

const imageLoadRules = [];
let fetchMode = 'none';

function el() {
  return {
    textContent: '', href: '', hidden: false, style: {}, files: [], dataset: {}, isConnected: true,
    classList: { toggle: () => false, remove: () => {}, add: () => {} },
    setAttribute: () => {}, addEventListener: () => {}, querySelector: () => el(), querySelectorAll: () => [], closest: () => null
  };
}

class MockImage {
  constructor() { this.naturalWidth = 320; this.naturalHeight = 480; this.width = 320; this.height = 480; }
  addEventListener(type, cb) { if (type === 'load') this.load = cb; if (type === 'error') this.error = cb; }
  set src(value) {
    this._src = value;
    setTimeout(() => {
      const shouldLoad = value.startsWith('data:') || imageLoadRules.some(rule => value.includes(rule));
      shouldLoad ? this.load?.() : this.error?.();
    }, 0);
  }
}

const context = {
  console,
  setTimeout,
  FileReader: class { addEventListener(type, cb) { this[type] = cb; } readAsDataURL() { this.result = 'data:image/png;base64,file'; this.load(); } },
  Image: MockImage,
  localStorage: { store: {}, getItem(k) { return this.store[k] || null; }, setItem(k, v) { this.store[k] = v; } },
  window: { location: { protocol: 'http:', origin: 'http://localhost' }, jspdf: { jsPDF: class {} } },
  document: {
    baseURI: 'http://localhost/index.html',
    body: { style: {} },
    getElementById: () => el(),
    querySelector: () => el(),
    querySelectorAll: () => [],
    addEventListener: () => {},
    createElement: tag => tag === 'canvas'
      ? { width: 0, height: 0, getContext: () => ({ drawImage: () => {} }), toDataURL: () => 'data:image/png;base64,pdf-page' }
      : el()
  },
  fetch: async url => {
    if (fetchMode === 'online' && String(url).includes('openlibrary.org')) {
      return { ok: true, json: async () => ({ docs: [{ cover_i: 12345 }] }) };
    }
    return { ok: false, json: async () => ({}) };
  },
  URL,
  Set,
  Promise,
  Error
};
context.window.pdfjsLib = null;
context.pdfjsLib = null;

vm.createContext(context);
vm.runInContext(fs.readFileSync('script.js', 'utf8'), context);

(async () => {
  imageLoadRules.push('/assets/books/atomic-habits.jpg');
  let cover = await context.window.MindBookPdf.resolveBookCover({ title: 'Atomic Habits', author: 'James Clear', pdf: 'assets/books/atomic-habits.pdf' }, { fresh: true });
  if (cover.source !== 'local' || !cover.src.includes('/assets/books/atomic-habits.jpg')) throw new Error(`local branch failed: ${JSON.stringify(cover)}`);

  imageLoadRules.length = 0;
  const pdfjsMock = {
    GlobalWorkerOptions: {},
    getDocument: () => ({ promise: Promise.resolve({ getPage: async () => ({ getViewport: () => ({ width: 200, height: 300 }), render: () => ({ promise: Promise.resolve() }) }) }) })
  };
  context.window.pdfjsLib = pdfjsMock;
  context.pdfjsLib = pdfjsMock;
  cover = await context.window.MindBookPdf.resolveBookCover({ title: 'PDF Only', author: 'A', pdf: 'assets/books/pdf-only.pdf' }, { fresh: true });
  if (cover.source !== 'pdf' || !cover.src.startsWith('data:image/png')) throw new Error(`pdf branch failed: ${JSON.stringify(cover)}`);

  context.window.pdfjsLib = null;
  context.pdfjsLib = null;
  fetchMode = 'online';
  imageLoadRules.push('covers.openlibrary.org');
  cover = await context.window.MindBookPdf.resolveBookCover({ title: 'Online Only', author: 'Metadata', pdf: '' }, { fresh: true });
  if (cover.source !== 'online' || !cover.src.includes('covers.openlibrary.org')) throw new Error(`online branch failed: ${JSON.stringify(cover)}`);

  fetchMode = 'none';
  imageLoadRules.length = 0;
  cover = await context.window.MindBookPdf.resolveBookCover({ title: 'Missing Cover', author: 'Nobody', pdf: '' }, { fresh: true });
  if (cover.source !== 'placeholder' || !cover.src.startsWith('data:image/svg+xml')) throw new Error(`placeholder branch failed: ${JSON.stringify(cover)}`);

  console.log('Cover resolver smoke tests passed');
})().catch(err => { console.error(err); process.exit(1); });
