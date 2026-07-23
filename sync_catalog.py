from __future__ import annotations

import json
import re
from pathlib import Path

SITE_DIR = Path(__file__).resolve().parents[1]
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
    ("focused", "Productivity"),
    ("planner", "Productivity"),
    ("guide", "Education"),
    ("boy", "Fiction"),
]


def js_string(value: str) -> str:
    return json.dumps(value, ensure_ascii=False)


def clean_title(path: Path) -> str:
    title = path.stem
    title = re.sub(r"@eBookRoom\.\s*", "", title, flags=re.I)
    title = re.sub(r"@OnlineBook_Ebook", "", title, flags=re.I)
    title = re.sub(r"\bPDF\b", "", title, flags=re.I)
    title = re.sub(r"[-_]+", " ", title)
    title = re.sub(r"\s+", " ", title).strip(" .-_")
    return title.title() if title else "Untitled Book"


def category_for(title: str) -> str:
    lower = title.lower()
    for hint, category in CATEGORY_HINTS:
        if hint in lower:
            return category
    return "General"


def count_pages(path: Path) -> int:
    try:
        data = path.read_bytes()
    except OSError:
        return 0
    return max(len(re.findall(rb"/Type\s*/Page\b", data)), 1)


def description_for(title: str, category: str) -> str:
    return f"Read or download {title}, added from your local book collection. Category: {category}."


def split_book_objects(array_body: str) -> list[str]:
    objects: list[str] = []
    start: int | None = None
    depth = 0
    in_string = False
    escaped = False

    for index, char in enumerate(array_body):
        if in_string:
            if escaped:
                escaped = False
            elif char == "\\":
                escaped = True
            elif char == '"':
                in_string = False
            continue

        if char == '"':
            in_string = True
        elif char == "{":
            if depth == 0:
                start = index
            depth += 1
        elif char == "}":
            depth -= 1
            if depth == 0 and start is not None:
                objects.append(array_body[start:index + 1].strip())
                start = None

    if depth != 0:
        raise SystemExit("Could not parse books array in script.js")
    return objects


def pdf_path_for(chunk: str) -> str | None:
    match = re.search(r'pdf:\s*"([^"]+\.pdf)"', chunk)
    return match.group(1).replace("\\", "/") if match else None


def make_book_object(path: Path, index: int) -> str:
    relative = path.relative_to(SITE_DIR).as_posix()
    title = clean_title(path)
    category = category_for(title)
    return (
        "  {\n"
        f"    title: {js_string(title)},\n"
        f"    author: {js_string('Local Collection')},\n"
        f"    category: {js_string(category)},\n"
        f"    pages: {count_pages(path)},\n"
        f"    description: {js_string(description_for(title, category))},\n"
        f"    pdf: {js_string(relative)},\n"
        f"    color: {js_string(COLORS[index % len(COLORS)])}\n"
        "  }"
    )


def main() -> None:
    if not SCRIPT_PATH.exists():
        raise SystemExit(f"Missing script file: {SCRIPT_PATH}")
    if not BOOKS_DIR.exists():
        raise SystemExit(f"Missing books folder: {BOOKS_DIR}")

    script = SCRIPT_PATH.read_text(encoding="utf-8")
    match = re.search(r"const\s+books\s*=\s*\[([\s\S]*?)\n\];", script)
    if not match:
        raise SystemExit("Could not find books catalog in script.js")

    objects = split_book_objects(match.group(1))
    listed_paths = {path for chunk in objects if (path := pdf_path_for(chunk))}
    pdf_files = sorted(BOOKS_DIR.glob("*.pdf"), key=lambda path: path.name.lower())

    added = []
    for path in pdf_files:
        relative = path.relative_to(SITE_DIR).as_posix()
        if relative not in listed_paths:
            added.append(make_book_object(path, len(objects) + len(added)))

    if not added:
        print(f"Catalog already contains all {len(pdf_files)} PDFs.")
        return

    all_objects = objects + added
    catalog = "const books = [\n" + ",\n".join(all_objects) + "\n];"
    updated = script[:match.start()] + catalog + script[match.end():]
    SCRIPT_PATH.write_text(updated, encoding="utf-8", newline="\n")

    print(f"Added {len(added)} missing PDF(s) to script.js:")
    for chunk in added:
        print(f"- {pdf_path_for(chunk)}")


if __name__ == "__main__":
    main()
