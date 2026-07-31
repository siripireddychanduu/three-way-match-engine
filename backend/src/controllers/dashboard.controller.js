const PurchaseOrder = require("../models/purchaseOrder.model");
const Grn = require("../models/grn.model");
const Invoice = require("../models/invoice.model");
const MatchAudit = require("../models/matchAudit.model");

exports.getDashboard = async (req, res) => {
  try {
    const purchaseOrders = await PurchaseOrder.countDocuments();
    const grns = await Grn.countDocuments();
    const invoices = await Invoice.countDocuments();
    const audits = await MatchAudit.countDocuments();

    const latestAudit = await MatchAudit.findOne().sort({ createdAt: -1 });

    const summary = latestAudit?.summary || {
      totalItems: 0,
      matchedItems: 0,
      mismatchedItems: 0,
      quantityMismatch: 0,
      missingInGRN: 0,
      missingInInvoice: 0,
    };

    return res.json({
      success: true,
      dashboard: {
        purchaseOrders,
        grns,
        invoices,
        audits,
        ...summary,
      },
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
