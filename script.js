const books = [
{
    title: "Rich Dad Poor Dad",
    author: "Local Collection",
    category: "Finance",
    pages: 241,
    description: "Read or download Rich Dad Poor Dad, added from your local book collection. Category: Finance.",
    pdf: "assets/books/rich-dad-poor-dad.pdf",
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
    title: "Atomic Habits",
    author: "Local Collection",
    category: "Productivity",
    pages: 386,
    description: "Read or download Atomic Habits, added from your local book collection. Category: Productivity.",
    pdf: "assets/books/atomic-habits.pdf",
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
    title: "redirection-11",
    author: "Local Collection",
    category: "General",
    pages: 227,
    description: "Read or download redirection-11, added from your local book collection. Category: General.",
    pdf: "assets/books/redirection-11.pdf",
    color: "linear-gradient(135deg, #4338ca, #06b6d4)"
  },
{
    title: "Talking with Psychopaths and Savages",
    author: "Local Collection",
    category: "Psychology",
    pages: 140,
    description: "Read or download Talking with Psychopaths and Savages, added from your local book collection. Category: Psychology.",
    pdf: "assets/books/talking-with-psychopaths-and-savages.pdf",
    color: "linear-gradient(135deg, #166534, #84cc16)"
  },
{
    title: "The Courage to be Disliked How to Change Your Life and Achieve Real",
    author: "Local Collection",
    category: "Philosophy",
    pages: 254,
    description: "Read or download The Courage to be Disliked How to Change Your Life and Achieve Real, added from your local book collection. Category: Philosophy.",
    pdf: "assets/books/the-courage-to-be-disliked-how-to-change-your-life-and-achieve-real.pdf",
    color: "linear-gradient(135deg, #581c87, #a855f7)"
  },
{
    title: "Digital Reading Guide",
    author: "Local Collection",
    category: "Education",
    pages: 1,
    description: "Read or download Digital Reading Guide, added from your local book collection. Category: Education.",
    pdf: "assets/books/digital-reading-guide.pdf",
    color: "linear-gradient(135deg, #7c3aed, #2563eb)"
  },
{
    title: "Knowledge Planner",
    author: "Local Collection",
    category: "Productivity",
    pages: 1,
    description: "Read or download Knowledge Planner, added from your local book collection. Category: Productivity.",
    pdf: "assets/books/knowledge-planner.pdf",
    color: "linear-gradient(135deg, #0f766e, #14b8a6)"
  },
{
    title: "The Focused Mind",
    author: "Local Collection",
    category: "Productivity",
    pages: 1,
    description: "Read or download The Focused Mind, added from your local book collection. Category: Productivity.",
    pdf: "assets/books/the-focused-mind.pdf",
    color: "linear-gradient(135deg, #c2410c, #f59e0b)"
  },
  {
    title: "Bhagata Gita",
    author: "Local Collection",
    category: "General",
    pages: 428,
    description: "Read or download Bhagata Gita, added from your local book collection. Category: General.",
    pdf: "assets/books/bhagata gita.pdf",
    color: "linear-gradient(135deg, #be123c, #f43f5e)"
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
