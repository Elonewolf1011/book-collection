const apiUrl = 'http://localhost:3000/books';

document.addEventListener('DOMContentLoaded', () => {
    const bookList = document.getElementById('book-list');
    const bookForm = document.getElementById('book-form');

    // Fetch and display books
    const fetchBooks = async () => {
        const res = await fetch(apiUrl);
        const books = await res.json();
        bookList.innerHTML = books.map(book => `<li>${book.title} by ${book.author}</li>`).join('');
    };

    // Add a new book
    bookForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;

        await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, author })
        });

        bookForm.reset();
        fetchBooks();
    });

    fetchBooks();
});
