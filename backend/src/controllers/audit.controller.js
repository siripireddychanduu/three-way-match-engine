const MatchAudit = require("../models/matchAudit.model");

// Get all audits
exports.getAllAudits = async (req, res) => {
  try {
    const audits = await MatchAudit.find()
      .sort({ createdAt: -1 })
      .select("poNumber summary createdAt");

    res.json({
      success: true,
      count: audits.length,
      audits,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get audit by PO Number
exports.getAuditByPo = async (req, res) => {
  try {
    const audit = await MatchAudit.findOne({
      poNumber: req.params.poNumber,
    });

    if (!audit) {
      return res.status(404).json({
        success: false,
        message: "Audit not found",
      });
    }

    res.json({
      success: true,
      audit,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
