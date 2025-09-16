// filepath: src/app.js
/**
 * Express application
 * Workshop participants should NOT modify this file - focus on testing
 */
const express = require('express');
const BookService = require('./services/bookService');

const app = express();
app.use(express.json());

const bookService = new BookService();

// TODO: participants will write integration tests for these routes
app.post('/books', (req, res) => {
  try {
    const book = bookService.createBook(req.body);
    res.status(201).json(book);
  } catch (error) {
    if (error.message === 'Invalid book data') {
      res.status(400).json({ error: 'Invalid book data', message: error.message });
    } else if (error.message === 'Book with this ISBN already exists') {
      res.status(409).json({ error: 'Conflict', message: error.message });
    } else {
      res.status(500).json({ error: 'Internal server error', message: error.message });
    }
  }
});

app.get('/books/:id', (req, res) => {
  try {
    const book = bookService.getBookById(req.params.id);
    if (!book) {
      res.status(404).json({ error: 'Book not found' });
    } else {
      res.status(200).json(book);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
});

app.get('/books', (req, res) => {
  try {
    const books = bookService.getAllBooks();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
});

app.put('/books/:id', (req, res) => {
  try {
    const book = bookService.updateBook(req.params.id, req.body);
    if (!book) {
      res.status(404).json({ error: 'Book not found' });
    } else {
      res.status(200).json(book);
    }
  } catch (error) {
    if (error.message === 'Invalid book data') {
      res.status(400).json({ error: 'Invalid book data', message: error.message });
    } else if (error.message === 'Book with this ISBN already exists') {
      res.status(409).json({ error: 'Conflict', message: error.message });
    } else {
      res.status(500).json({ error: 'Internal server error', message: error.message });
    }
  }
});

app.delete('/books/:id', (req, res) => {
  try {
    const deleted = bookService.deleteBook(req.params.id);
    if (!deleted) {
      res.status(404).json({ error: 'Book not found' });
    } else {
      res.status(200).json({ message: 'Book deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
});

// Test helper endpoint - clear all books (useful for integration tests)
app.delete('/books', (req, res) => {
  bookService.clearAllBooks();
  res.status(200).json({ message: 'All books cleared' });
});

module.exports = app;