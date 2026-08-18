import urllib.request

checks = [
    ('index.html', 'pdf.min.js'),
    ('script.js', 'resolveBookCover'),
    ('styles.css', 'book-cover-image'),
]

for path, needle in checks:
    with urllib.request.urlopen(f'http://127.0.0.1:8767/{path}', timeout=5) as response:
        body = response.read().decode('utf-8', 'ignore')
        if response.status != 200:
            raise SystemExit(f'{path} returned {response.status}')
        if needle not in body:
            raise SystemExit(f'{path} missing {needle}')

print('HTTP asset smoke passed')
