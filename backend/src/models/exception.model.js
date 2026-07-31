const mongoose = require("mongoose");

const ExceptionSchema = new mongoose.Schema(
  {
    poNumber: {
      type: String,
      required: true,
      index: true,
    },

    vendorName: {
      type: String,
      default: "",
    },

    type: {
      type: String,
      enum: [
        "QUANTITY_MISMATCH",
        "PRICE_MISMATCH",
        "MRP_MISMATCH",
        "INVOICE_DATE_AFTER_PO_DATE",
        "UNMAPPED_MASTER_SKU",
        "GRN_MISSING",
        "INVOICE_MISSING",
        "ITEM_MISSING_IN_PO",
      ],
      required: true,
    },

    severity: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH"],
      default: "MEDIUM",
    },

    description: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["OPEN", "IN_PROGRESS", "RESOLVED"],
      default: "OPEN",
    },

    remarks: {
      type: String,
      default: "",
    },

    resolvedBy: {
      type: String,
      default: "",
    },

    resolvedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Exception", ExceptionSchema);
