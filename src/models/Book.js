// filepath: src/models/Book.js
/**
 * Book model class
 * Workshop participants should NOT modify this file - focus on testing
 */
class Book {
  constructor(id, title, author, isbn, publishedYear, price) {
    // TODO: participants will test this constructor through unit tests
    this.id = id;
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.publishedYear = publishedYear;
    this.price = price;
  }

  // TODO: participants will test validation methods
  isValid() {
    if (!this.title || typeof this.title !== 'string' || this.title.trim().length === 0) {
      return false;
    }
    if (!this.author || typeof this.author !== 'string' || this.author.trim().length === 0) {
      return false;
    }
    if (!this.isbn || typeof this.isbn !== 'string' || !this.isbn.match(/^978-\d{10}$/)) {
      return false;
    }
    if (!this.publishedYear || typeof this.publishedYear !== 'number' || 
        this.publishedYear < 1000 || this.publishedYear > new Date().getFullYear()) {
      return false;
    }
    if (this.price === undefined || this.price === null || 
        typeof this.price !== 'number' || this.price < 0) {
      return false;
    }
    return true;
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      author: this.author,
      isbn: this.isbn,
      publishedYear: this.publishedYear,
      price: this.price
    };
  }

  static fromJSON(data) {
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid JSON data');
    }
    return new Book(
      data.id,
      data.title,
      data.author,
      data.isbn,
      data.publishedYear,
      data.price
    );
  }
}

module.exports = Book;