const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const BookDAO = require("../DAO/bookDAO");

class BookQueryHandlers {
  constructor() {
    this.s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  async handleGetAllBooks(query) {
    return await BookDAO.getAll();
  }

  async handleGetBookById(query) {
    return await BookDAO.getById(query.id);
  }

  async handleGetBookPdf(query) {
    const pdfPath = await BookDAO.getPdfPath(query.id);
    const command = new GetObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: pdfPath,
    });

    return await getSignedUrl(this.s3Client, command, { expiresIn: 3600 });
  }
}

module.exports = new BookQueryHandlers();
