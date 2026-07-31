const mongoose = require("mongoose");

const matchAuditSchema = new mongoose.Schema(
  {
    poNumber: String,

    steps: [
      {
        step: String,
        status: String,
        message: String,
        at: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("MatchAudit", matchAuditSchema);
