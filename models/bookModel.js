class Book {
  constructor({ id, bookname, author, gender, bookstatus, pdf_path }) {
    this.id = id;
    this.bookname = bookname;
    this.author = author;
    this.gender = gender;
    this.bookstatus = bookstatus || "Activo";
    this.pdfPath = pdf_path;
  }
}

module.exports = Book;
