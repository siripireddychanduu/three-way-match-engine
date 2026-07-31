const PurchaseOrder = require("../models/purchaseOrder.model");
const Grn = require("../models/grn.model");
const Invoice = require("../models/invoice.model");
const geminiService = require("./gemini.service");

async function getAllDocuments() {
  const purchaseOrders = await PurchaseOrder.find().select(
    "_id poNumber fileName originalFileName createdAt",
  );

  const grns = await Grn.find().select(
    "_id grnNumber poNumber fileName originalFileName createdAt",
  );

  const invoices = await Invoice.find().select(
    "_id invoiceNumber poNumber fileName originalFileName createdAt",
  );

  return {
    purchaseOrders,
    grns,
    invoices,
  };
}

async function getDocumentById(id) {
  let document = await PurchaseOrder.findById(id);

  if (document) {
    return {
      type: "PO",
      document,
    };
  }

  document = await Grn.findById(id);

  if (document) {
    return {
      type: "GRN",
      document,
    };
  }

  document = await Invoice.findById(id);

  if (document) {
    return {
      type: "INVOICE",
      document,
    };
  }

  throw new Error("Document not found");
}

async function getDocumentFile(id) {
  let document = await PurchaseOrder.findById(id);

  if (!document) {
    document = await Grn.findById(id);
  }

  if (!document) {
    document = await Invoice.findById(id);
  }

  if (!document) {
    throw new Error("Document not found");
  }

  return document.filePath;
}

async function processUpload(file, documentType) {
  if (!file) {
    throw new Error("File is required");
  }

  if (!documentType) {
    throw new Error("Document type is required");
  }

  const parsedData = await geminiService.parseDocument(file.path, documentType);
  parsedData.fileName = file.filename;
  parsedData.filePath = file.path;
  parsedData.originalFileName = file.originalname;

  let savedDocument;

  switch (documentType.toLowerCase()) {
    case "po": {
      const exists = await PurchaseOrder.findOne({
        poNumber: parsedData.poNumber,
      });

      if (exists) {
        throw new Error("Purchase Order already exists");
      }

      savedDocument = await PurchaseOrder.create(parsedData);
      break;
    }

    case "grn": {
      const exists = await Grn.findOne({
        grnNumber: parsedData.grnNumber,
      });

      if (exists) {
        throw new Error("GRN already exists");
      }

      // Convert DD-MM-YYYY to Date
      if (parsedData.grnDate) {
        const [day, month, year] = parsedData.grnDate.split("-");

        parsedData.grnDate = new Date(
          `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`,
        );
      }

      savedDocument = await Grn.create(parsedData);
      break;
    }

    case "invoice": {
      const exists = await Invoice.findOne({
        invoiceNumber: parsedData.invoiceNumber,
      });

      if (exists) {
        throw new Error("Invoice already exists");
      }

      // Convert invoiceDate if required
      if (parsedData.invoiceDate) {
        const parts = parsedData.invoiceDate.split("/");

        if (parts.length === 3) {
          const [day, month, year] = parts;

          parsedData.invoiceDate = new Date(
            `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`,
          );
        }
      }

      savedDocument = await Invoice.create(parsedData);

      break;
    }

    default:
      throw new Error("Invalid document type");
  }

  return {
    success: true,
    id: savedDocument._id,
    fileName: savedDocument.fileName,
    documentType,
    parsedData: savedDocument,
  };
}

module.exports = {
  processUpload,
  getAllDocuments,
  getDocumentById,
  getDocumentFile,
};
