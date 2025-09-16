// filepath: src/services/bookService.js
/**
 * Book service layer
 * Workshop participants should NOT modify this file - focus on testing
 */
const Book = require('../models/Book');
const BookRepository = require('../repositories/bookRepository');

class BookService {
  constructor() {
    this.repository = new BookRepository();
  }

  // TODO: participants will write unit tests for these methods
  createBook(bookData) {
    // Create book instance and validate
    const book = new Book(
      null, // ID will be assigned by repository
      bookData.title,
      bookData.author,
      bookData.isbn,
      bookData.publishedYear,
      bookData.price
    );

    if (!book.isValid()) {
      throw new Error('Invalid book data');
    }

    // Check for duplicate ISBN
    const existingBook = this.repository.findByIsbn(book.isbn);
    if (existingBook) {
      throw new Error('Book with this ISBN already exists');
    }

    return this.repository.save(book);
  }

  getBookById(id) {
    if (!id || isNaN(parseInt(id))) {
      return null;
    }
    return this.repository.findById(id);
  }

  getAllBooks() {
    return this.repository.findAll();
  }

  updateBook(id, updateData) {
    if (!id || isNaN(parseInt(id))) {
      return null;
    }

    const existingBook = this.repository.findById(id);
    if (!existingBook) {
      return null;
    }

    // Create updated book to validate
    const updatedBook = new Book(
      parseInt(id),
      updateData.title !== undefined ? updateData.title : existingBook.title,
      updateData.author !== undefined ? updateData.author : existingBook.author,
      updateData.isbn !== undefined ? updateData.isbn : existingBook.isbn,
      updateData.publishedYear !== undefined ? updateData.publishedYear : existingBook.publishedYear,
      updateData.price !== undefined ? updateData.price : existingBook.price
    );

    if (!updatedBook.isValid()) {
      throw new Error('Invalid book data');
    }

    // Check for duplicate ISBN if ISBN is being updated
    if (updateData.isbn && updateData.isbn !== existingBook.isbn) {
      const duplicateBook = this.repository.findByIsbn(updateData.isbn);
      if (duplicateBook) {
        throw new Error('Book with this ISBN already exists');
      }
    }

    return this.repository.update(id, updateData);
  }

  deleteBook(id) {
    if (!id || isNaN(parseInt(id))) {
      return false;
    }
    return this.repository.deleteById(id);
  }

  // Helper method for testing
  clearAllBooks() {
    this.repository.clear();
  }
}

module.exports = BookService;
