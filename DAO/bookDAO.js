const db = require("../config/database");
const Book = require("../models/bookModel");
const BookViewModel = require("../ViewModel/BookViewModel");

class BookDAO {
  async getAll() {
    const [rows] = await db.execute("SELECT * FROM books");
    return rows.map((row) => new Book(row));
  }

  async getById(id) {
    const [rows] = await db.execute("SELECT * FROM books WHERE id = ?", [id]);
    if (rows.length === 0) {
      throw new Error("No se encontró el libro con el ID proporcionado");
    }
    return new Book(rows[0]);
  }

  async insert(book) {
    const [result] = await db.execute(
      "INSERT INTO books (bookname, author, bookstatus, gender, pdf_path) VALUES (?, ?, ?, ?, ?)",
      [book.bookname, book.author, book.bookstatus, book.gender, book.pdfPath]
    );
    return result.insertId;
  }

  async update(book) {
    const updates = {};
    const params = [];
    const setClauses = [];

    if (book.bookname !== undefined) {
      updates.bookname = book.bookname;
      setClauses.push("bookname = ?");
      params.push(book.bookname);
    }

    if (book.author !== undefined) {
      updates.author = book.author;
      setClauses.push("author = ?");
      params.push(book.author);
    }

    if (book.gender !== undefined) {
      updates.gender = book.gender;
      setClauses.push("gender = ?");
      params.push(book.gender);
    }

    if (book.pdfPath !== undefined) {
      updates.pdf_path = book.pdfPath;
      setClauses.push("pdf_path = ?");
      params.push(book.pdfPath);
    }

    if (setClauses.length === 0) {
      throw new Error("No se proporcionaron campos para actualizar");
    }

    params.push(book.id);

    const query = `
      UPDATE books 
      SET ${setClauses.join(", ")} 
      WHERE id = ?
    `;

    const [result] = await db.execute(query, params);

    if (result.affectedRows === 0) {
      throw new Error("No se encontró el libro con el ID proporcionado");
    }

    return result.affectedRows;
  }

  async updateStatus(id, newStatus) {
    const [result] = await db.execute(
      "UPDATE books SET bookstatus = ? WHERE id = ?",
      [newStatus, id]
    );
    if (result.affectedRows === 0) {
      throw new Error("No se pudo actualizar el estado del libro");
    }
    return result.affectedRows;
  }

  async getPdfPath(id) {
    const [rows] = await db.execute("SELECT pdf_path FROM books WHERE id = ?", [
      id,
    ]);
    if (rows.length === 0) {
      throw new Error("No se encontró el libro con el ID proporcionado");
    }
    return rows[0].pdf_path;
  }
}

module.exports = new BookDAO();
