// filepath: src/repositories/bookRepository.js
/**
 * In-memory book repository
 * Workshop participants should NOT modify this file - focus on testing
 */
class BookRepository {
  constructor() {
    this.books = new Map();
    this.nextId = 1;
  }

  // TODO: participants will test these methods through service layer
  save(book) {
    if (!book.id) {
      book.id = this.nextId++;
    }
    this.books.set(book.id, { ...book });
    return { ...book };
  }

  findById(id) {
    const book = this.books.get(parseInt(id));
    return book ? { ...book } : null;
  }

  findAll() {
    return Array.from(this.books.values()).map(book => ({ ...book }));
  }

  deleteById(id) {
    const numericId = parseInt(id);
    if (this.books.has(numericId)) {
      this.books.delete(numericId);
      return true;
    }
    return false;
  }

  findByIsbn(isbn) {
    for (const book of this.books.values()) {
      if (book.isbn === isbn) {
        return { ...book };
      }
    }
    return null;
  }

  update(id, bookData) {
    const numericId = parseInt(id);
    if (this.books.has(numericId)) {
      const updatedBook = { ...this.books.get(numericId), ...bookData, id: numericId };
      this.books.set(numericId, updatedBook);
      return { ...updatedBook };
    }
    return null;
  }

  clear() {
    this.books.clear();
    this.nextId = 1;
  }
}

module.exports = BookRepository;