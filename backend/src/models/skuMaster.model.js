const mongoose = require("mongoose");

const skuMasterSchema = new mongoose.Schema(
  {
    internalSku: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    vendorSku: {
      type: String,
      default: "",
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    // Assignment fields

    agreedRate: {
      type: Number,
      default: 0,
      min: 0,
    },

    mrp: {
      type: Number,
      default: 0,
      min: 0,
    },

    priceTolerance: {
      type: Number,
      default: 0.05, // 5%
      min: 0,
    },

    hsnCode: {
      type: String,
      default: "",
      trim: true,
    },

    uom: {
      type: String,
      default: "",
      trim: true,
    },

    eanCode: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("SkuMaster", skuMasterSchema);
