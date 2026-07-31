const mongoose = require("mongoose");
const ItemSchema = require("./item.schema");

const grnSchema = new mongoose.Schema(
  {
    grnNumber: String,

    poNumber: String,

    grnDate: Date,

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

module.exports = mongoose.model("Grn", grnSchema);
