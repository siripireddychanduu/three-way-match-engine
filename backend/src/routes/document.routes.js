const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload.middleware");
const controller = require("../controllers/document.controller");

router.post("/upload", upload.single("file"), controller.uploadDocument);
router.get("/", controller.getAllDocuments);
router.get("/:id", controller.getDocumentById);
router.get("/:id/file", controller.getDocumentFile);

module.exports = router;
