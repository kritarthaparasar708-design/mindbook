const fs = require('fs');
const vm = require('vm');
const calls = [];
function el() { return { textContent: '', href: '', hidden: false, style: {}, files: [], dataset: {}, classList: { toggle: () => false, remove: () => {}, add: () => {} }, setAttribute: () => {}, addEventListener: () => {}, querySelector: () => el(), querySelectorAll: () => [], closest: () => null }; }
class MockFileReader {
  addEventListener(type, cb) { this[type] = cb; }
  readAsDataURL() { this.result = 'data:image/png;base64,abc'; this.load(); }
}
class MockImage {
  constructor() { this.naturalWidth = 300; this.naturalHeight = 600; this.width = 300; this.height = 600; }
  addEventListener(type, cb) { if (type === 'load') this.load = cb; }
  set src(value) { this._src = value; setTimeout(() => this.load(), 0); }
}
class MockPdf {
  constructor() { this.internal = { pageSize: { getWidth: () => 210, getHeight: () => 297 } }; }
  addImage(...args) { calls.push(['addImage', ...args]); }
  setFont(...args) { calls.push(['setFont', ...args]); }
  setFontSize(...args) { calls.push(['setFontSize', ...args]); }
  splitTextToSize(text) { return [text]; }
  text(...args) { calls.push(['text', ...args]); }
  addPage() { calls.push(['addPage']); }
  save(name) { calls.push(['save', name]); }
}
const context = {
  console,
  setTimeout,
  FileReader: MockFileReader,
  Image: MockImage,
  window: { location: { protocol: 'http:', origin: 'http://localhost' }, jspdf: { jsPDF: MockPdf } },
  document: {
    baseURI: 'http://localhost/index.html',
    body: { style: {} },
    getElementById: () => el(),
    querySelector: () => el(),
    querySelectorAll: () => [],
    addEventListener: () => {},
    createElement: tag => tag === 'canvas' ? { width: 0, height: 0, getContext: () => ({ drawImage: () => {} }), toDataURL: () => 'data:image/png;base64,embedded' } : el()
  },
  fetch: async () => ({ ok: true }),
  URL,
  Set,
  Promise,
  Error
};
context.window.MindBookPdf = undefined;
vm.createContext(context);
vm.runInContext(fs.readFileSync('script.js', 'utf8'), context);
(async () => {
  await context.window.MindBookPdf.generateBookPdf({ title: 'Cover Test', content: 'Body', coverFile: { type: 'image/webp' } });
  const addImage = calls.find(c => c[0] === 'addImage');
  const firstText = calls.findIndex(c => c[0] === 'text');
  const imageIndex = calls.findIndex(c => c[0] === 'addImage');
  if (!addImage) throw new Error('addImage was not called');
  if (!(imageIndex > -1 && imageIndex < firstText)) throw new Error('cover was not added before title text');
  const [, dataUrl, format, x, y, width, height] = addImage;
  if (dataUrl !== 'data:image/png;base64,embedded' || format !== 'PNG') throw new Error('cover was not embedded as PNG data');
  if (Math.abs(x - 83) > 0.001 || y !== 18 || width !== 44 || height !== 88) throw new Error(`bad cover geometry: ${JSON.stringify(addImage)}`);
  calls.length = 0;
  await context.window.MindBookPdf.generateBookPdf({ title: 'No Cover', content: 'Body', coverFile: null });
  if (calls.some(c => c[0] === 'addImage')) throw new Error('no-cover PDF should not add image');
  console.log('PDF cover tests passed');
})().catch(err => { console.error(err); process.exit(1); });
