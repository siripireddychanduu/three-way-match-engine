const mongoose = require("mongoose");
const ItemSchema = require("./item.schema");

const invoiceSchema = new mongoose.Schema(
  {
    invoiceNumber: String,

    poNumber: String,

    invoiceDate: Date,

    items: [ItemSchema],

    rawParsed: Object,
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

module.exports = mongoose.model("Invoice", invoiceSchema);
