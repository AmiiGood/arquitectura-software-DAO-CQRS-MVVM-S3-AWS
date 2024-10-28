const {
  RegisterBookCommand,
  UpdateBookCommand,
  UpdateBookStatusCommand,
} = require("../commands/bookCommand");
const {
  GetAllBooksQuery,
  GetBookByIdQuery,
  GetBookPdfQuery,
} = require("../queries/bookQueries");
const commandHandlers = require("../handlers/commandHandler");
const queryHandlers = require("../handlers/queryHandler");
const BookViewModel = require("../ViewModel/BookViewModel");

exports.register = async (req, res) => {
  try {
    const { bookname, author, gender } = req.body;
    const pdfFile = req.file;

    if (!bookname || !author || !gender || !pdfFile) {
      return res
        .status(400)
        .json({ message: "Todos los campos son requeridos" });
    }

    const command = new RegisterBookCommand(bookname, author, gender, pdfFile);

    try {
      const bookId = await commandHandlers.handleRegisterBook(command);
      res
        .status(201)
        .json({ message: "Libro registrado exitosamente", bookId });
    } catch (validationError) {
      return res.status(400).json({
        message: "Error de validación",
        errors: validationError.message.split(". "),
      });
    }
  } catch (error) {
    console.error("Error al registrar el libro:", error);
    res
      .status(500)
      .json({ message: "Error en el servidor", error: error.message });
  }
};

exports.get = async (req, res) => {
  try {
    const query = new GetAllBooksQuery();
    const books = await queryHandlers.handleGetAllBooks(query);
    res.json(books);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error en el servidor", error: error.message });
  }
};

exports.getPublic = async (req, res) => {
  try {
    const query = new GetAllBooksQuery();
    const books = await queryHandlers.handleGetAllBooks(query);

    const respuesta = books.map(
      (book) =>
        new BookViewModel({
          id: book.id,
          bookname: book.bookname,
          author: book.author,
          gender: book.gender,
          bookstatus: book.bookstatus,
          pdf_path: book.pdfPath,
        })
    );

    res.json(respuesta);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error en el servidor", error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const query = new GetBookByIdQuery(req.params.id);
    const book = await queryHandlers.handleGetBookById(query);
    res.json(book);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error en el servidor", error: error.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { bookname, author, gender } = req.body;
    const pdfFile = req.file;

    const command = new UpdateBookCommand(
      id,
      bookname,
      author,
      gender,
      pdfFile
    );

    try {
      const affectedRows = await commandHandlers.handleUpdateBook(command);
      res.status(200).json({
        message: "Libro actualizado exitosamente",
        affectedRows,
      });
    } catch (validationError) {
      return res.status(400).json({
        message: "Error de validación",
        errors: validationError.message.split(". "),
      });
    }
  } catch (error) {
    console.error("Error al actualizar el libro:", error);
    res
      .status(500)
      .json({ message: "Error en el servidor", error: error.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const command = new UpdateBookStatusCommand(req.params.id);
    const affectedRows = await commandHandlers.handleUpdateBookStatus(command);

    res.status(200).json({
      message: "Estado del libro actualizado exitosamente",
      affectedRows,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error en el servidor", error: error.message });
  }
};

exports.getPdf = async (req, res) => {
  try {
    const query = new GetBookPdfQuery(req.params.id);
    const signedUrl = await queryHandlers.handleGetBookPdf(query);
    res.json({ pdfUrl: signedUrl });
  } catch (error) {
    console.error("Error al obtener el PDF:", error);
    res
      .status(500)
      .json({ message: "Error al obtener el PDF", error: error.message });
  }
};
