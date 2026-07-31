const PurchaseOrder = require("../models/purchaseOrder.model");
const Grn = require("../models/grn.model");
const Invoice = require("../models/invoice.model");

exports.getSummary = async (req, res) => {
  try {
    const { poNumber } = req.params;

    const po = await PurchaseOrder.findOne({ poNumber });

    if (!po) {
      return res.status(404).json({
        success: false,
        message: "Purchase Order not found",
      });
    }

    const grns = await Grn.find({ poNumber });

    const invoices = await Invoice.find({ poNumber });

    // Ordered Quantity
    const totalOrdered = po.items.reduce(
      (sum, item) => sum + Number(item.quantity || 0),
      0,
    );

    // Received Quantity
    const totalReceived = grns.reduce((sum, grn) => {
      return (
        sum +
        grn.items.reduce((s, item) => s + Number(item.receivedQuantity || 0), 0)
      );
    }, 0);

    // Invoiced Quantity
    const totalInvoiced = invoices.reduce((sum, invoice) => {
      return (
        sum +
        invoice.items.reduce((s, item) => s + Number(item.quantity || 0), 0)
      );
    }, 0);

    // PO Amount
    const poAmount = po.items.reduce((sum, item) => {
      return sum + Number(item.quantity || 0) * Number(item.unitRate || 0);
    }, 0);

    const pendingDelivery = totalOrdered - totalReceived;
    const associatedDocuments = [];

    // PO
    associatedDocuments.push({
      type: "PO",
      number: po.poNumber,
      date: po.poDate,
      quantity: totalOrdered,
      amount: poAmount,
    });

    // GRNs
    grns.forEach((grn) => {
      const qty = grn.items.reduce(
        (sum, item) => sum + Number(item.receivedQuantity || 0),
        0,
      );

      associatedDocuments.push({
        type: "GRN",
        number: grn.grnNumber,
        date: grn.grnDate,
        quantity: qty,
      });
    });

    // Invoices
    invoices.forEach((invoice) => {
      const qty = invoice.items.reduce(
        (sum, item) => sum + Number(item.quantity || 0),
        0,
      );

      const amount = invoice.items.reduce(
        (sum, item) =>
          sum + Number(item.quantity || 0) * Number(item.unitRate || 0),
        0,
      );

      associatedDocuments.push({
        type: "Invoice",
        number: invoice.invoiceNumber,
        date: invoice.invoiceDate,
        quantity: qty,
        amount,
      });
    });

    let status = "MATCHED";

    if (!grns.length || !invoices.length) {
      status = "INSUFFICIENT_DOCUMENTS";
    } else if (
      totalReceived !== totalOrdered ||
      totalInvoiced !== totalOrdered
    ) {
      status = "PARTIALLY_MATCHED";
    }

    res.json({
      success: true,
      summary: {
        poNumber,
        poAmount,
        totalOrdered,
        totalReceived,
        totalInvoiced,
        pendingDelivery,
        status,
        associatedDocuments,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
