const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const authMiddleware = require("../middlewares/authMiddleware");
const multer = require("multer");
const path = require("path");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/register", upload.single("pdf"), bookController.register);
router.get("/books", bookController.get);
router.get("/publicBooks", bookController.getPublic);
router.put("/books/:id", upload.single("pdf"), bookController.updateBook);
router.patch("/books/:id/status", bookController.updateStatus);
router.get("/books/:id/pdf", bookController.getPdf);
router.get("/books/:id", bookController.getById);

module.exports = router;
