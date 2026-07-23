from __future__ import annotations

import re
from pathlib import Path

SITE_DIR = Path(__file__).resolve().parents[1]
BOOKS_DIR = SITE_DIR / "assets" / "books"
SCRIPT_PATH = SITE_DIR / "script.js"

script = SCRIPT_PATH.read_text(encoding="utf-8")
catalog_paths = [path.replace("\\", "/") for path in re.findall(r'pdf:\s*"([^"]+\.pdf)"', script)]
listed = set(catalog_paths)
files = {path.relative_to(SITE_DIR).as_posix() for path in BOOKS_DIR.glob("*.pdf")}

missing_files = sorted(path for path in listed if not (SITE_DIR / path).exists())
unlisted_files = sorted(files - listed)
duplicate_entries = sorted(path for path in listed if catalog_paths.count(path) > 1)

print(f"Catalog entries: {len(catalog_paths)}")
print(f"PDF files: {len(files)}")
print(f"Missing files referenced by catalog: {len(missing_files)}")
print(f"PDF files not listed in catalog: {len(unlisted_files)}")
print(f"Duplicate catalog entries: {len(duplicate_entries)}")

if missing_files:
    print("\nMissing files:")
    for path in missing_files:
        print(f"- {path}")

if unlisted_files:
    print("\nUnlisted PDF files:")
    for path in unlisted_files:
        print(f"- {path}")

if duplicate_entries:
    print("\nDuplicate entries:")
    for path in duplicate_entries:
        print(f"- {path}")

if missing_files or unlisted_files or duplicate_entries:
    raise SystemExit("Catalog verification failed. Run: python tools/sync_catalog.py")

print("Catalog verification passed.")
