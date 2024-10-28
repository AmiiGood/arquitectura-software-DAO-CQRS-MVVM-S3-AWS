const { v4: uuidv4 } = require("uuid");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const BookDAO = require("../DAO/bookDAO");
const Book = require("../models/bookModel");
const BookValidator = require("../Validators/bookValidators");

class BookCommandHandlers {
  constructor() {
    this.s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  async handleRegisterBook(command) {
    const validation = command.validate();
    if (!validation.isValid) {
      throw new Error(validation.errors.join(". "));
    }

    const key = `pdfs/${uuidv4()}-${command.pdfFile.originalname}`;
    const s3Command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
      Body: command.pdfFile.buffer,
      ContentType: "application/pdf",
    });

    await this.s3Client.send(s3Command);

    const newBook = new Book({
      bookname: command.bookname,
      author: command.author,
      gender: command.gender,
      pdfPath: key,
    });

    return await BookDAO.insert(newBook);
  }

  async handleUpdateBook(command) {
    if (command.bookname || command.gender) {
      const validation = command.validate();
      if (!validation.isValid) {
        throw new Error(validation.errors.join(". "));
      }
    }

    let pdfKey;
    if (command.pdfFile) {
      pdfKey = `pdfs/${uuidv4()}-${command.pdfFile.originalname}`;
      const s3Command = new PutObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: pdfKey,
        Body: command.pdfFile.buffer,
        ContentType: "application/pdf",
      });
      await this.s3Client.send(s3Command);
    }

    const updateData = {
      id: command.id,
      bookname: command.bookname,
      author: command.author,
      gender: command.gender,
      pdfPath: pdfKey,
    };

    return await BookDAO.update(updateData);
  }

  async handleUpdateBookStatus(command) {
    const book = await BookDAO.getById(command.id);
    const newStatus = book.bookstatus === "Activo" ? "Inactivo" : "Activo";
    return await BookDAO.updateStatus(command.id, newStatus);
  }
}

module.exports = new BookCommandHandlers();
