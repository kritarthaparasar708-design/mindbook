const books = [
  {
    title: "The Focused Mind",
    author: "Mind Book Editorial",
    category: "Self Growth",
    pages: 18,
    description: "A short guide about focus, reading habits, and building a clear learning routine.",
    pdf: "assets/books/the-focused-mind.pdf",
    color: "linear-gradient(135deg, #7c3aed, #2563eb)"
  },
  {
    title: "Digital Reading Guide",
    author: "Mind Book Library",
    category: "Education",
    pages: 12,
    description: "Helpful tips for using PDF books, saving notes, and organizing personal study material.",
    pdf: "assets/books/digital-reading-guide.pdf",
    color: "linear-gradient(135deg, #0f766e, #14b8a6)"
  },
  {
    title: "Knowledge Planner",
    author: "Mind Book Studio",
    category: "Productivity",
    pages: 10,
    description: "A compact printable planner for tracking books, chapters, ideas, and downloads.",
    pdf: "assets/books/knowledge-planner.pdf",
    color: "linear-gradient(135deg, #c2410c, #f59e0b)"
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
        <a class="btn btn-secondary" href="${book.pdf}" download>Download</a>
      </div>
    </article>
  `).join("");
}

function openReader(book) {
  modalTitle.textContent = book.title;
  modalDownload.href = book.pdf;
  modalDownload.setAttribute("download", book.pdf.split("/").pop());
  pdfFrame.src = book.pdf;
  pdfModal.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeReader() {
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
