const BookValidator = require("../Validators/bookValidators");

class RegisterBookCommand {
  constructor(bookname, author, gender, pdfFile) {
    this.bookname = bookname;
    this.author = author;
    this.gender = gender;
    this.pdfFile = pdfFile;
  }

  validate() {
    return BookValidator.validate(this);
  }
}

class UpdateBookCommand {
  constructor(id, bookname, author, gender, pdfFile) {
    this.id = id;
    this.bookname = bookname;
    this.author = author;
    this.gender = gender;
    this.pdfFile = pdfFile;
  }

  validate() {
    return BookValidator.validate(this);
  }
}

class UpdateStatusCommand {
  constructor(id) {
    this.id = id;
  }
}

module.exports = {
  RegisterBookCommand,
  UpdateBookCommand,
  UpdateStatusCommand,
};
