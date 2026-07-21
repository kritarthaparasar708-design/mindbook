from pathlib import Path

BOOKS = [
    ("the-focused-mind.pdf", "The Focused Mind", "Mind Book Editorial", [
        "Welcome to Mind Book.",
        "This sample PDF proves that the website reader and download buttons work.",
        "Replace this file with your real book PDF when ready.",
    ]),
    ("digital-reading-guide.pdf", "Digital Reading Guide", "Mind Book Library", [
        "A clean PDF library helps readers find useful material quickly.",
        "Use clear titles, categories, and short descriptions for every upload.",
        "Readers can open PDFs in the browser or download them for offline study.",
    ]),
    ("knowledge-planner.pdf", "Knowledge Planner", "Mind Book Studio", [
        "Track books, chapters, and ideas in one place.",
        "Add your own printable planner PDF to customize this website.",
        "Keep learning organized and simple.",
    ]),
]

OUT_DIR = Path(__file__).resolve().parents[1] / "assets" / "books"
OUT_DIR.mkdir(parents=True, exist_ok=True)


def pdf_escape(text: str) -> str:
    return text.replace("\\", "\\\\").replace("(", "\\(").replace(")", "\\)")


def make_pdf(title: str, author: str, lines: list[str]) -> bytes:
    stream_lines = [
        "BT",
        "/F1 30 Tf",
        "72 760 Td",
        f"({pdf_escape(title)}) Tj",
        "0 -42 Td",
        "/F1 14 Tf",
        f"(By {pdf_escape(author)}) Tj",
        "0 -52 Td",
        "/F1 12 Tf",
    ]
    for line in lines:
        stream_lines.append(f"({pdf_escape(line)}) Tj")
        stream_lines.append("0 -24 Td")
    stream_lines.extend([
        "0 -36 Td",
        "(To add your own book, copy a PDF into assets/books and edit script.js.) Tj",
        "ET",
    ])
    content = "\n".join(stream_lines).encode("latin-1", errors="replace")

    objects = [
        b"1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n",
        b"2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n",
        b"3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>\nendobj\n",
        b"4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n",
        b"5 0 obj\n<< /Length " + str(len(content)).encode() + b" >>\nstream\n" + content + b"\nendstream\nendobj\n",
    ]

    pdf = bytearray(b"%PDF-1.4\n% Mind Book sample PDF\n")
    offsets = [0]
    for obj in objects:
        offsets.append(len(pdf))
        pdf.extend(obj)
    xref_offset = len(pdf)
    pdf.extend(f"xref\n0 {len(objects) + 1}\n".encode())
    pdf.extend(b"0000000000 65535 f \n")
    for offset in offsets[1:]:
        pdf.extend(f"{offset:010d} 00000 n \n".encode())
    pdf.extend(f"trailer\n<< /Size {len(objects) + 1} /Root 1 0 R >>\nstartxref\n{xref_offset}\n%%EOF\n".encode())
    return bytes(pdf)


for filename, title, author, lines in BOOKS:
    (OUT_DIR / filename).write_bytes(make_pdf(title, author, lines))
    print(f"Created {OUT_DIR / filename}")
