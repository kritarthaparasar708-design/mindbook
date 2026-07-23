#website 

https://mindbook-coral.vercel.app/

# Mind Book

Mind Book is a professional static website for reading and downloading PDF books.

## Files

- `index.html` - website structure
- `styles.css` - professional responsive design
- `script.js` - editable book catalog, search, filters, and PDF reader
- `assets/books/` - put your PDF files here

## How to add your own PDF book

1. Copy your PDF into this folder:

   ```text
   assets/books/
   ```

   Example:

   ```text
   assets/books/my-book.pdf
   ```

2. Sync the catalog automatically:

   ```bash
   python tools/sync_catalog.py
   python tools/verify_catalog.py
   ```

   The sync script adds any PDF in `assets/books/` to the `books` list in `script.js`, so it can appear on the website.

3. Optional: open `script.js` if you want to customize the generated title, author, category, description, or color.

4. Save the files and open `index.html` in your browser.

## Publishing

Upload the full `MindBook` folder to any static hosting service, for example GitHub Pages, Netlify, Vercel, or your normal web hosting.

## Important

Only upload PDFs that you own or have permission to share.
