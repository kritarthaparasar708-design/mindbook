from pathlib import Path
import re

site = Path(r"C:\Users\HP\Desktop\MindBook")
script = (site / "script.js").read_text(encoding="utf-8")
paths = re.findall(r'pdf: "([^"]+\.pdf)"', script)
missing = [path for path in paths if not (site / path).exists()]

print(f"Catalog entries: {len(paths)}")
print(f"Missing PDFs: {len(missing)}")
for path in paths:
    print(path)

if missing:
    raise SystemExit("Missing PDFs: " + ", ".join(missing))
