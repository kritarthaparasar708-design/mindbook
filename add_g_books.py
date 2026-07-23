from __future__ import annotations

import json
import re
import shutil
from pathlib import Path

SOURCE_DIR = Path(r"G:\book")
SITE_DIR = Path(r"C:\Users\HP\Desktop\MindBook")
BOOKS_DIR = SITE_DIR / "assets" / "books"
SCRIPT_PATH = SITE_DIR / "script.js"

COLORS = [
    "linear-gradient(135deg, #7c3aed, #2563eb)",
    "linear-gradient(135deg, #0f766e, #14b8a6)",
    "linear-gradient(135deg, #c2410c, #f59e0b)",
    "linear-gradient(135deg, #be123c, #f43f5e)",
    "linear-gradient(135deg, #4338ca, #06b6d4)",
    "linear-gradient(135deg, #166534, #84cc16)",
    "linear-gradient(135deg, #581c87, #a855f7)",
]

CATEGORY_HINTS = [
    ("rich dad", "Finance"),
    ("atomic habits", "Productivity"),
    ("ikigai", "Self Growth"),
    ("courage", "Philosophy"),
    ("psychopath", "Psychology"),
    ("boy", "Fiction"),
]


def clean_title(path: Path) -> str:
    title = path.stem
    title = re.sub(r"@eBookRoom\.\s*", "", title, flags=re.I)
    title = re.sub(r"@OnlineBook_Ebook", "", title, flags=re.I)
    title = re.sub(r"\bPDF\b", "", title, flags=re.I)
    title = title.replace("_", " ")
    title = re.sub(r"\s+", " ", title).strip(" .-_")
    return title.title() if title.isupper() else title


def safe_filename(path: Path) -> str:
    title = clean_title(path).lower()
    title = re.sub(r"[^a-z0-9]+", "-", title)
    title = re.sub(r"-+", "-", title).strip("-") or "book"
    candidate = f"{title}.pdf"
    used = {p.name.lower() for p in BOOKS_DIR.glob("*.pdf")}
    if candidate.lower() not in used:
        return candidate
    i = 2
    while f"{title}-{i}.pdf".lower() in used:
        i += 1
    return f"{title}-{i}.pdf"


def count_pages(path: Path) -> int:
    try:
        data = path.read_bytes()
    except OSError:
        return 0
    count = len(re.findall(rb"/Type\s*/Page\b", data))
    return max(count, 1)


def category_for(title: str) -> str:
    lower = title.lower()
    for hint, category in CATEGORY_HINTS:
        if hint in lower:
            return category
    return "General"


def description_for(title: str, category: str) -> str:
    return f"Read or download {title}, added from your local book collection. Category: {category}."


def js_string(value: str) -> str:
    return json.dumps(value, ensure_ascii=False)


def format_books(books: list[dict]) -> str:
    chunks = []
    for book in books:
        chunks.append(
            "  {\n"
            f"    title: {js_string(book['title'])},\n"
            f"    author: {js_string(book['author'])},\n"
            f"    category: {js_string(book['category'])},\n"
            f"    pages: {int(book['pages'])},\n"
            f"    description: {js_string(book['description'])},\n"
            f"    pdf: {js_string(book['pdf'])},\n"
            f"    color: {js_string(book['color'])}\n"
            "  }"
        )
    return "const books = [\n" + ",\n".join(chunks) + "\n];"


def existing_non_sample_entries(script: str) -> list[dict]:
    # The original sample books are useful for testing, but after adding real books
    # the public catalog should focus on the user's collection.
    return []


def main() -> None:
    if not SOURCE_DIR.exists():
        raise SystemExit(f"Source folder not found: {SOURCE_DIR}")
    if not SCRIPT_PATH.exists():
        raise SystemExit(f"MindBook script not found: {SCRIPT_PATH}")

    BOOKS_DIR.mkdir(parents=True, exist_ok=True)
    pdfs = sorted(SOURCE_DIR.glob("*.pdf"), key=lambda p: p.name.lower())
    if not pdfs:
        raise SystemExit(f"No PDF files found in {SOURCE_DIR}")

    books = []
    for idx, source in enumerate(pdfs):
        title = clean_title(source)
        dest_name = safe_filename(source)
        dest = BOOKS_DIR / dest_name
        shutil.copy2(source, dest)
        category = category_for(title)
        books.append({
            "title": title,
            "author": "Local Collection",
            "category": category,
            "pages": count_pages(dest),
            "description": description_for(title, category),
            "pdf": f"assets/books/{dest_name}",
            "color": COLORS[idx % len(COLORS)],
        })

    script = SCRIPT_PATH.read_text(encoding="utf-8")
    new_catalog = format_books(books)
    updated = re.sub(r"const books = \[[\s\S]*?\];", new_catalog, script, count=1)
    if updated == script:
        raise SystemExit("Could not find books catalog in script.js")
    SCRIPT_PATH.write_text(updated, encoding="utf-8", newline="\n")

    print(f"Added {len(books)} books:")
    for book in books:
        print(f"- {book['title']} -> {book['pdf']}")


if __name__ == "__main__":
    main()
