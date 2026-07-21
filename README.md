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

2. Open `script.js`.

3. Add a new object inside the `books` list:

   ```js
   {
     title: "My Book Title",
     author: "Author Name",
     category: "Education",
     pages: 120,
     description: "Short description of the book.",
     pdf: "assets/books/my-book.pdf",
     color: "linear-gradient(135deg, #7c3aed, #f59e0b)"
   }
   ```

4. Save the file and open `index.html` in your browser.

## Publishing

Upload the full `MindBook` folder to any static hosting service, for example GitHub Pages, Netlify, Vercel, or your normal web hosting.

## Important

Only upload PDFs that you own or have permission to share.
