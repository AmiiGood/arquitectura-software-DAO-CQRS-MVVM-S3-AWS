class BookViewModel {
  constructor({ id, bookname, author, gender, bookstatus, pdf_path }) {
    this.idLibro = id;
    this.nombre = bookname;
    this.autor = author;
    this.genero = gender;
    this.estatus = bookstatus || "Activo";
    this.pdf = pdf_path;
  }
}

module.exports = BookViewModel;
