const documentService = require("../services/document.service");

exports.uploadDocument = async (req, res) => {
  try {
    const result = await documentService.processUpload(
      req.file,
      req.body.documentType,
    );

    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};
exports.getAllDocuments = async (req, res) => {
  try {
    const documents = await documentService.getAllDocuments();

    res.status(200).json({
      success: true,
      data: documents,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getDocumentById = async (req, res) => {
  try {
    const result = await documentService.getDocumentById(req.params.id);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getDocumentFile = async (req, res) => {
  try {
    const filePath = await documentService.getDocumentFile(req.params.id);

    return res.sendFile(require("path").resolve(filePath));
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getDocumentFile = async (req, res) => {
  try {
    const filePath = await documentService.getDocumentFile(req.params.id);

    return res.sendFile(require("path").resolve(filePath));
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
