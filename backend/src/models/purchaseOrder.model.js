const mongoose = require("mongoose");
const ItemSchema = require("./item.schema");

const purchaseOrderSchema = new mongoose.Schema(
  {
    poNumber: {
      type: String,
      required: true,
      unique: true, // Prevent duplicate PO uploads
      index: true,
    },

    poDate: {
      type: Date,
      required: true,
    },

    vendorName: {
      type: String,
      required: true,
    },

    items: {
      type: [ItemSchema],
      default: [],
    },

    rawParsed: {
      type: Object,
      default: {},
    },
    fileName: {
      type: String,
    },

    filePath: {
      type: String,
    },

    originalFileName: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("PurchaseOrder", purchaseOrderSchema);
