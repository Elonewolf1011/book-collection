const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

// Path to the books data
const booksFilePath = './backend/books.json';

// Read books
app.get('/books', (req, res) => {
    fs.readFile(booksFilePath, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading file');
        res.json(JSON.parse(data));
    });
});

// Add a book
app.post('/books', (req, res) => {
    const newBook = req.body;
    fs.readFile(booksFilePath, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading file');
        const books = JSON.parse(data);
        books.push(newBook);
        fs.writeFile(booksFilePath, JSON.stringify(books), (err) => {
            if (err) return res.status(500).send('Error writing file');
            res.status(201).send('Book added successfully');
        });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});