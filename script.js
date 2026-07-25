const books = [
{
    title: "Rich Dad Poor Dad",
    author: "Local Collection",
    category: "Finance",
    pages: 241,
    description: "Read or download Rich Dad Poor Dad, added from your local book collection. Category: Finance.",
    pdf: "assets/books/rich-dad-poor-dad-2.pdf",
    color: "linear-gradient(135deg, #7c3aed, #2563eb)"
  },
{
    title: "The Boy Who Did Not Sign",
    author: "Local Collection",
    category: "Fiction",
    pages: 313,
    description: "Read or download The Boy Who Did Not Sign, added from your local book collection. Category: Fiction.",
    pdf: "assets/books/the-boy-who-did-not-sign-2.pdf",
    color: "linear-gradient(135deg, #0f766e, #0ee0c8)"
  },
{
    title: "Atomic Habits",
    author: "Local Collection",
    category: "Productivity",
    pages: 386,
    description: "Read or download Atomic Habits, added from your local book collection. Category: Productivity.",
    pdf: "assets/books/atomic-habits-2.pdf",
    color: "linear-gradient(135deg, #c2410c, #f59e0b)"
  },
{
    title: "Ikigai",
    author: "Local Collection",
    category: "Self Growth",
    pages: 123,
    description: "Read or download Ikigai, added from your local book collection. Category: Self Growth.",
    pdf: "assets/books/ikigai-2.pdf",
    color: "linear-gradient(135deg, #be123c, #f43f5e)"
  },
{
    title: "The Courage to be Disliked How to Change Your Life and Achieve Real",
    author: "Local Collection",
    category: "Philosophy",
    pages: 254,
    description: "Read or download The Courage to be Disliked How to Change Your Life and Achieve Real, added from your local book collection. Category: Philosophy.",
    pdf: "assets/books/the-courage-to-be-disliked-how-to-change-your-life-and-achieve-real-2.pdf",
    color: "linear-gradient(135deg, #4338ca, #06b6d4)"
  },
{
    title: "Atomic Habits",
    author: "Local Collection",
    category: "Productivity",
    pages: 386,
    description: "Read or download Atomic Habits, added from your local book collection. Category: Productivity.",
    pdf: "assets/books/atomic-habits.pdf",
    color: "linear-gradient(135deg, #166534, #84cc16)"
  },
{
    title: "Bhagata Gita",
    author: "Local Collection",
    category: "General",
    pages: 428,
    description: "Read or download Bhagata Gita, added from your local book collection. Category: General.",
    pdf: "assets/books/bhagata gita.pdf",
    color: "linear-gradient(135deg, #581c87, #a855f7)"
  },
{
    title: "Clearthinking",
    author: "Local Collection",
    category: "General",
    pages: 289,
    description: "Read or download Clearthinking, added from your local book collection. Category: General.",
    pdf: "assets/books/ClearThinking.pdf",
    color: "linear-gradient(135deg, #7c3aed, #2563eb)"
  },
{
    title: "Deep Work",
    author: "Local Collection",
    category: "General",
    pages: 190,
    description: "Read or download Deep Work, added from your local book collection. Category: General.",
    pdf: "assets/books/Deep Work.pdf",
    color: "linear-gradient(135deg, #0f766e, #14b8a6)"
  },
{
    title: "Ego Is The Enenmy",
    author: "Local Collection",
    category: "General",
    pages: 168,
    description: "Read or download Ego Is The Enenmy, added from your local book collection. Category: General.",
    pdf: "assets/books/Ego is the Enenmy.pdf",
    color: "linear-gradient(135deg, #c2410c, #f59e0b)"
  },
{
    title: "Ikigai",
    author: "Local Collection",
    category: "Self Growth",
    pages: 123,
    description: "Read or download Ikigai, added from your local book collection. Category: Self Growth.",
    pdf: "assets/books/ikigai.pdf",
    color: "linear-gradient(135deg, #be123c, #f43f5e)"
  },
{
    title: "Rich Dad Poor Dad",
    author: "Local Collection",
    category: "Finance",
    pages: 241,
    description: "Read or download Rich Dad Poor Dad, added from your local book collection. Category: Finance.",
    pdf: "assets/books/rich-dad-poor-dad.pdf",
    color: "linear-gradient(135deg, #4338ca, #06b6d4)"
  },
{
    title: "Talking With Psychopaths And Savages",
    author: "Local Collection",
    category: "Psychology",
    pages: 227,
    description: "Read or download Talking With Psychopaths And Savages, added from your local book collection. Category: Psychology.",
    pdf: "assets/books/talking with psychopaths and savages.pdf",
    color: "linear-gradient(135deg, #166534, #84cc16)"
  },
{
    title: "The 48 Laws Of Power",
    author: "Local Collection",
    category: "General",
    pages: 476,
    description: "Read or download The 48 Laws Of Power, added from your local book collection. Category: General.",
    pdf: "assets/books/The 48 Laws Of Power.pdf",
    color: "linear-gradient(135deg, #581c87, #a855f7)"
  },
{
    title: "The Art Of Persuasion",
    author: "Local Collection",
    category: "General",
    pages: 193,
    description: "Read or download The Art Of Persuasion, added from your local book collection. Category: General.",
    pdf: "assets/books/The Art of Persuasion.pdf",
    color: "linear-gradient(135deg, #7c3aed, #2563eb)"
  },
{
    title: "The Boy Who Did Not Sign",
    author: "Local Collection",
    category: "Fiction",
    pages: 313,
    description: "Read or download The Boy Who Did Not Sign, added from your local book collection. Category: Fiction.",
    pdf: "assets/books/the-boy-who-did-not-sign.pdf",
    color: "linear-gradient(135deg, #0f766e, #14b8a6)"
  },
{
    title: "The Courage To Be Disliked How To Change Your Life And Achieve Real",
    author: "Local Collection",
    category: "Philosophy",
    pages: 254,
    description: "Read or download The Courage To Be Disliked How To Change Your Life And Achieve Real, added from your local book collection. Category: Philosophy.",
    pdf: "assets/books/the-courage-to-be-disliked-how-to-change-your-life-and-achieve-real.pdf",
    color: "linear-gradient(135deg, #c2410c, #f59e0b)"
  },
{
    title: "The One Thing",
    author: "Local Collection",
    category: "General",
    pages: 216,
    description: "Read or download The One Thing, added from your local book collection. Category: General.",
    pdf: "assets/books/The-ONE-Thing.pdf",
    color: "linear-gradient(135deg, #be123c, #f43f5e)"
  },
{
    title: "The Psychology Of Money Morgan Housel",
    author: "Local Collection",
    category: "General",
    pages: 292,
    description: "Read or download The Psychology Of Money Morgan Housel, added from your local book collection. Category: General.",
    pdf: "assets/books/The-Psychology-of-Money-Morgan-Housel.pdf",
    color: "linear-gradient(135deg, #4338ca, #06b6d4)"
  },
  {
    title: "Evolutionary Psychology By Lance Workman And Will Reader",
    author: "Local Collection",
    category: "General",
    pages: 1,
    description: "Read or download Evolutionary Psychology By Lance Workman And Will Reader, added from your local book collection. Category: General.",
    pdf: "assets/books/Evolutionary Psychology by Lance Workman and Will Reader.pdf",
    color: "linear-gradient(135deg, #166534, #84cc16)"
  },
  {
    title: "Harrypotter Complete Volume",
    author: "Local Collection",
    category: "General",
    pages: 3623,
    description: "Read or download Harrypotter Complete Volume, added from your local book collection. Category: General.",
    pdf: "assets/books/Harrypotter Complete Volume.pdf",
    color: "linear-gradient(135deg, #581c87, #a855f7)"
  },
  {
    title: "No Rules Rules",
    author: "Local Collection",
    category: "General",
    pages: 376,
    description: "Read or download No Rules Rules, added from your local book collection. Category: General.",
    pdf: "assets/books/No Rules Rules.pdf",
    color: "linear-gradient(135deg, #7c3aed, #2563eb)"
  },
  {
    title: "The Hard Thing About Hard Things",
    author: "Local Collection",
    category: "General",
    pages: 238,
    description: "Read or download The Hard Thing About Hard Things, added from your local book collection. Category: General.",
    pdf: "assets/books/The Hard Thing About Hard Things.pdf",
    color: "linear-gradient(135deg, #0f766e, #14b8a6)"
  },
  {
    title: "The Story Of The Human Body",
    author: "Local Collection",
    category: "General",
    pages: 548,
    description: "Read or download The Story Of The Human Body, added from your local book collection. Category: General.",
    pdf: "assets/books/The Story of the Human Body.pdf",
    color: "linear-gradient(135deg, #c2410c, #f59e0b)"
  },
  {
    title: "The Art Of Seduction",
    author: "Local Collection",
    category: "General",
    pages: 1570,
    description: "Read or download The Art Of Seduction, added from your local book collection. Category: General.",
    pdf: "assets/books/the-art-of-seduction.pdf",
    color: "linear-gradient(135deg, #be123c, #f43f5e)"
  },
  {
    title: "The Laws Of Human Nature By Robert Greene Z Lib.Org",
    author: "Local Collection",
    category: "General",
    pages: 690,
    description: "Read or download The Laws Of Human Nature By Robert Greene Z Lib.Org, added from your local book collection. Category: General.",
    pdf: "assets/books/The-Laws-of-Human-Nature-by-Robert-Greene-z-lib.org_.pdf",
    color: "linear-gradient(135deg, #4338ca, #06b6d4)"
  },
  {
    title: "Thinking, Fast And Slow",
    author: "Local Collection",
    category: "General",
    pages: 468,
    description: "Read or download Thinking, Fast And Slow, added from your local book collection. Category: General.",
    pdf: "assets/books/Thinking, Fast and Slow.pdf",
    color: "linear-gradient(135deg, #166534, #84cc16)"
  },
  {
    title: "Zero To One",
    author: "Local Collection",
    category: "General",
    pages: 213,
    description: "Read or download Zero To One, added from your local book collection. Category: General.",
    pdf: "assets/books/Zero to One.pdf",
    color: "linear-gradient(135deg, #581c87, #a855f7)"
  }
];

const state = {
  search: "",
  category: "All"
};

const bookGrid = document.getElementById("bookGrid");
const emptyState = document.getElementById("emptyState");
const searchInput = document.getElementById("searchInput");
const categoryFilters = document.getElementById("categoryFilters");
const pdfModal = document.getElementById("pdfModal");
const pdfFrame = document.getElementById("pdfFrame");
const modalTitle = document.getElementById("modalTitle");
const modalDownload = document.getElementById("modalDownload");
const navLinks = document.querySelector("[data-nav-links]");
const menuToggle = document.querySelector(".menu-toggle");
let readerRequestId = 0;

document.getElementById("year").textContent = new Date().getFullYear();
document.querySelector('[data-count="books"]').textContent = books.length;

function getCategories() {
  return ["All", ...new Set(books.map(book => book.category))];
}

function renderCategories() {
  categoryFilters.innerHTML = getCategories().map(category => `
    <button class="filter-pill${category === state.category ? " active" : ""}" type="button" data-category="${category}">
      ${category}
    </button>
  `).join("");
}

function bookMatches(book) {
  const searchText = `${book.title} ${book.author} ${book.category} ${book.description}`.toLowerCase();
  const matchesSearch = searchText.includes(state.search.toLowerCase());
  const matchesCategory = state.category === "All" || book.category === state.category;
  return matchesSearch && matchesCategory;
}

function normalizePdfPath(path) {
  return path.replace(/^\/+/, "");
}

function pdfHref(path) {
  const normalized = normalizePdfPath(path);

  if (window.location.protocol === "file:") {
    return normalized;
  }

  return `/${normalized}`;
}

function pdfFileName(path) {
  return normalizePdfPath(path).split("/").pop();
}

function pdfCandidates(path) {
  const normalized = normalizePdfPath(path);

  if (window.location.protocol === "file:") {
    return [normalized];
  }

  return [
    new URL(normalized, document.baseURI).href,
    new URL(`/${normalized}`, window.location.origin).href
  ].filter((url, index, urls) => urls.indexOf(url) === index);
}

async function resolvePdfUrl(path) {
  const candidates = pdfCandidates(path);

  for (const url of candidates) {
    try {
      const response = await fetch(url, { method: "HEAD", cache: "no-store" });
      if (response.ok) return url;
    } catch (error) {
      // Opening from file:// or a host that blocks HEAD still works with the fallback URL.
    }
  }

  return candidates[candidates.length - 1] || path;
}

function renderBooks() {
  const visibleBooks = books.filter(bookMatches);
  emptyState.hidden = visibleBooks.length > 0;

  bookGrid.innerHTML = visibleBooks.map((book, index) => `
    <article class="book-card">
      <div class="cover" style="background: ${book.color}">
        <span class="cover-category">${book.category}</span>
        <span class="cover-title">${book.title}</span>
      </div>
      <div class="book-meta">
        <span>${book.author}</span>
        <span>${book.pages} pages</span>
      </div>
      <p>${book.description}</p>
      <div class="card-actions">
        <button class="btn btn-primary" type="button" data-read-index="${index}">Read PDF</button>
        <a class="btn btn-secondary" href="${pdfHref(book.pdf)}" download>Download</a>
      </div>
    </article>
  `).join("");
}

async function openReader(book) {
  const requestId = ++readerRequestId;
  modalTitle.textContent = book.title;
  modalDownload.href = pdfHref(book.pdf);
  modalDownload.setAttribute("download", pdfFileName(book.pdf));
  pdfFrame.src = "about:blank";
  pdfModal.hidden = false;
  document.body.style.overflow = "hidden";

  const pdfUrl = await resolvePdfUrl(book.pdf);
  if (requestId !== readerRequestId || pdfModal.hidden) return;

  modalDownload.href = pdfUrl;
  pdfFrame.src = pdfUrl;
}

function closeReader() {
  readerRequestId += 1;
  pdfModal.hidden = true;
  pdfFrame.src = "about:blank";
  document.body.style.overflow = "";
}

searchInput.addEventListener("input", event => {
  state.search = event.target.value.trim();
  renderBooks();
});

categoryFilters.addEventListener("click", event => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  state.category = button.dataset.category;
  renderCategories();
  renderBooks();
});

bookGrid.addEventListener("click", event => {
  const button = event.target.closest("[data-read-index]");
  if (!button) return;
  const visibleBooks = books.filter(bookMatches);
  openReader(visibleBooks[Number(button.dataset.readIndex)]);
});

document.querySelectorAll("[data-close-modal]").forEach(element => {
  element.addEventListener("click", closeReader);
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && !pdfModal.hidden) closeReader();
});

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.addEventListener("click", event => {
  if (event.target.matches("a")) {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});

renderCategories();
renderBooks();
