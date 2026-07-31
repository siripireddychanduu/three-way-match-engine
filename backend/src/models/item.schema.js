const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    itemCode: String,

    description: String,

    quantity: Number,

    receivedQuantity: Number,

    unitRate: {
      type: Number,
      default: 0,
    },

    mrp: {
      type: Number,
      default: 0,
    },

    skuMaster: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SkuMaster",
      default: null,
    },
  },
  { _id: false },
);

module.exports = itemSchema;
