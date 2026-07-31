const PurchaseOrder = require("../models/purchaseOrder.model");
const Grn = require("../models/grn.model");
const Invoice = require("../models/invoice.model");
const MatchAudit = require("../models/matchAudit.model");
const SkuMaster = require("../models/skuMaster.model");
const exceptionService = require("../services/exception.service");

// Normalize item code
function normalizeItemCode(code) {
  return String(code || "")
    .toLowerCase()
    .replace(/\bpsm\b/g, "")
    .replace(/\s+/g, "")
    .trim();
}

// Normalize description
function normalizeDescription(desc) {
  return String(desc || "")
    .toLowerCase()
    .replace(/\bpsm\b/g, "")
    .replace(/vegetable/g, "veg")
    .replace(/pieces/g, "")
    .replace(/pcs/g, "")
    .replace(/\bg\b/g, "")
    .replace(/colour:.*/g, "")
    .replace(/size:.*/g, "")
    .replace(/brand:.*/g, "")
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// Clean description for audit messages
function cleanDescription(desc) {
  return (desc || "")
    .replace(/Colour:.*$/i, "")
    .replace(/Brand:.*$/i, "")
    .replace(/Size:.*$/i, "")
    .replace(/\s+/g, " ")
    .trim();
}

exports.getMatch = async (req, res) => {
  try {
    const { poNumber } = req.params;

    const po = await PurchaseOrder.findOne({ poNumber });
    const grn = await Grn.findOne({ poNumber });
    const invoice = await Invoice.findOne({ poNumber });

    if (!po) {
      return res.status(404).json({
        success: false,
        message: "Purchase Order not found",
      });
    }

    if (!grn) {
      return res.status(404).json({
        success: false,
        message: "GRN not found",
      });
    }

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    // ---------------- SKU MASTER CACHE ----------------

    const skuList = await SkuMaster.find();

    const skuMap = new Map();

    skuList.forEach((sku) => {
      skuMap.set(normalizeItemCode(sku.internalSku), sku);
    });

    // ---------------- COUNTERS ----------------

    let matchedItems = 0;
    let mismatchedItems = 0;

    let quantityMismatch = 0;
    let priceMismatch = 0;
    let mrpMismatch = 0;
    let unmappedSku = 0;
    let invoiceDateMismatch = 0;

    let missingInGRN = 0;
    let missingInInvoice = 0;

    const audit = {
      poNumber,
      summary: {},
      steps: [],
    };

    // ---------- Invoice Date Validation ----------

    if (
      po.poDate &&
      invoice.invoiceDate &&
      new Date(invoice.invoiceDate) > new Date(po.poDate)
    ) {
      mismatchedItems++;
      invoiceDateMismatch++;

      audit.steps.push({
        step: "Invoice Date Check",
        status: "INVOICE_DATE_AFTER_PO_DATE",
        message: `Invoice Date ${invoice.invoiceDate} is after PO Date ${po.poDate}`,
      });
      await exceptionService.createException({
        poNumber,
        vendorName: po.vendorName || "",
        type: "INVOICE_DATE_AFTER_PO_DATE",
        description: `Invoice Date ${invoice.invoiceDate} is after PO Date ${po.poDate}`,
        severity: "LOW",
      });
    }

    // ---------------- MATCHING ----------------
    const comparison = [];
    for (const poItem of po.items) {
      // ---------- GRN ----------
      let grnItem = grn.items.find(
        (item) =>
          normalizeItemCode(item.itemCode) ===
          normalizeItemCode(poItem.itemCode),
      );

      if (!grnItem) {
        grnItem = grn.items.find(
          (item) =>
            normalizeDescription(item.description) ===
            normalizeDescription(cleanDescription(poItem.description)),
        );
      }

      // ---------- Invoice ----------
      let invoiceItem = null;

      const sku = skuMap.get(normalizeItemCode(poItem.itemCode));

      // ---------- SKU MASTER CHECK ----------

      if (!sku) {
        mismatchedItems++;
        unmappedSku++;

        audit.steps.push({
          step: "SKU Match",
          status: "UNMAPPED_MASTER_SKU",
          message: `${cleanDescription(poItem.description)} not found in SKU Master`,
        });
        await exceptionService.createException({
          poNumber,
          vendorName: po.vendorName || "",
          type: "UNMAPPED_MASTER_SKU",
          description: `${cleanDescription(poItem.description)} not found in SKU Master`,
          severity: "MEDIUM",
        });
      }
      if (sku) {
        invoiceItem = invoice.items.find(
          (item) =>
            normalizeItemCode(item.itemCode) ===
            normalizeItemCode(sku.vendorSku),
        );
      }

      // Fallback to description matching
      if (!invoiceItem) {
        invoiceItem = invoice.items.find(
          (item) =>
            normalizeDescription(item.description) ===
            normalizeDescription(cleanDescription(poItem.description)),
        );
      }

      // ---------- GRN Missing ----------

      if (!grnItem) {
        mismatchedItems++;
        missingInGRN++;

        audit.steps.push({
          step: "GRN Match",
          status: "GRN_MISSING",
          message: `${cleanDescription(poItem.description)} missing in GRN`,
        });
        await exceptionService.createException({
          poNumber,
          vendorName: po.vendorName || "",
          type: "GRN_MISSING",
          description: `${cleanDescription(poItem.description)} missing in GRN`,
          severity: "HIGH",
        });

        continue;
      }

      // ---------- Invoice Missing ----------

      if (!invoiceItem) {
        mismatchedItems++;
        missingInInvoice++;

        audit.steps.push({
          step: "Invoice Match",
          status: "INVOICE_MISSING",
          message: `${cleanDescription(poItem.description)} missing in Invoice`,
        });
        await exceptionService.createException({
          poNumber,
          vendorName: po.vendorName || "",
          type: "INVOICE_MISSING",
          description: `${cleanDescription(poItem.description)} missing in Invoice`,
          severity: "HIGH",
        });

        continue;
      }

      // ---------- Quantity Check ----------

      const poQty = Number(poItem.quantity);
      const grnQty = Number(grnItem.receivedQuantity);
      const invoiceQty = Number(invoiceItem.quantity);

      // Item match flag
      let itemMatched = true;

      // ---------- GRN Quantity Validation ----------

      if (grnQty > poQty) {
        itemMatched = false;
        mismatchedItems++;

        audit.steps.push({
          step: "GRN Quantity Check",
          status: "GRN_QTY_EXCEEDS_PO_QTY",
          message:
            `${cleanDescription(poItem.description)}\n` +
            `PO=${poQty}, GRN=${grnQty}`,
        });
      }

      // ---------- Invoice vs GRN ----------

      if (invoiceQty > grnQty) {
        itemMatched = false;
        mismatchedItems++;

        audit.steps.push({
          step: "Invoice Quantity Check",
          status: "INVOICE_QTY_EXCEEDS_GRN_QTY",
          message:
            `${cleanDescription(poItem.description)}\n` +
            `Invoice=${invoiceQty}, GRN=${grnQty}`,
        });
      }

      // ---------- Invoice vs PO ----------

      if (invoiceQty > poQty) {
        itemMatched = false;
        mismatchedItems++;

        audit.steps.push({
          step: "Invoice Quantity Check",
          status: "INVOICE_QTY_EXCEEDS_PO_QTY",
          message:
            `${cleanDescription(poItem.description)}\n` +
            `Invoice=${invoiceQty}, PO=${poQty}`,
        });
      }

      // ---------- Overall Quantity Match ----------

      if (poQty !== grnQty || poQty !== invoiceQty) {
        itemMatched = false;
        mismatchedItems++;
        quantityMismatch++;

        audit.steps.push({
          step: "Quantity Check",
          status: "QUANTITY_MISMATCH",
          message:
            `${cleanDescription(poItem.description)}\n` +
            `PO=${poQty}, GRN=${grnQty}, Invoice=${invoiceQty}`,
        });
        await exceptionService.createException({
          poNumber,
          vendorName: po.vendorName || "",
          type: "QUANTITY_MISMATCH",
          description: `${cleanDescription(poItem.description)} | PO=${poQty}, GRN=${grnQty}, Invoice=${invoiceQty}`,
          severity: "HIGH",
        });
      }

      // ---------- PRICE CHECK ----------

      if (sku && invoiceItem) {
        const invoiceRate = Number(invoiceItem.unitRate || 0);
        const agreedRate = Number(sku.agreedRate || 0);
        const tolerance = Number(sku.priceTolerance || 0.05);

        if (agreedRate > 0) {
          const allowedDifference = agreedRate * tolerance;

          if (Math.abs(invoiceRate - agreedRate) > allowedDifference) {
            itemMatched = false;
            mismatchedItems++;
            priceMismatch++;

            audit.steps.push({
              step: "Price Check",
              status: "PRICE_MISMATCH",
              message:
                `${cleanDescription(poItem.description)}\n` +
                `Invoice Rate=${invoiceRate}, Agreed Rate=${agreedRate}`,
            });
            await exceptionService.createException({
              poNumber,
              vendorName: po.vendorName || "",
              type: "PRICE_MISMATCH",
              description: `${cleanDescription(poItem.description)} | Invoice Rate=${invoiceRate}, Agreed Rate=${agreedRate}`,
              severity: "HIGH",
            });
          }
        }
      }

      // ---------- MRP CHECK ----------

      if (sku) {
        const skuMrp = Number(sku.mrp || 0);
        const invoiceMrp = Number(invoiceItem?.mrp || 0);
        const grnMrp = Number(grnItem?.mrp || 0);

        if (skuMrp > 0) {
          if (invoiceMrp !== skuMrp) {
            itemMatched = false;
            mismatchedItems++;
            mrpMismatch++;
            audit.steps.push({
              step: "MRP Check",
              status: "MRP_MISMATCH",
              message:
                `${cleanDescription(poItem.description)}\n` +
                `Invoice MRP=${invoiceMrp}, SKU MRP=${skuMrp}`,
            });
            await exceptionService.createException({
              poNumber,
              vendorName: po.vendorName || "",
              type: "MRP_MISMATCH",
              description: `${cleanDescription(poItem.description)} | Invoice MRP=${invoiceMrp}, SKU MRP=${skuMrp}`,
              severity: "MEDIUM",
            });
          }

          if (grnMrp !== skuMrp) {
            itemMatched = false;
            mismatchedItems++;
            mrpMismatch++;
            audit.steps.push({
              step: "MRP Check",
              status: "MRP_MISMATCH",
              message:
                `${cleanDescription(poItem.description)}\n` +
                `GRN MRP=${grnMrp}, SKU MRP=${skuMrp}`,
            });
            await exceptionService.createException({
              poNumber,
              vendorName: po.vendorName || "",
              type: "MRP_MISMATCH",
              description: `${cleanDescription(poItem.description)} | GRN MRP=${grnMrp}, SKU MRP=${skuMrp}`,
              severity: "MEDIUM",
            });
          }
        }
      }
      if (itemMatched) {
        matchedItems++;

        audit.steps.push({
          step: "Three Way Match",
          status: "MATCHED",
          message: `${cleanDescription(poItem.description)} matched`,
        });
      }

      comparison.push({
        sku: poItem.itemCode,
        description: cleanDescription(poItem.description),

        poQty: Number(poItem.quantity),

        grnQty: grnItem ? Number(grnItem.receivedQuantity) : null,

        invoiceQty: invoiceItem ? Number(invoiceItem.quantity) : null,

        poPrice: Number(poItem.unitRate || poItem.rate || 0),

        invoicePrice: invoiceItem
          ? Number(invoiceItem.unitRate || invoiceItem.rate || 0)
          : null,

        status: itemMatched ? "MATCH" : "MISMATCH",
      });
    }

    // ---------- Extra GRN Items ----------

    for (const grnItem of grn.items) {
      const existsInPO = po.items.some(
        (item) =>
          normalizeItemCode(item.itemCode) ===
          normalizeItemCode(grnItem.itemCode),
      );

      if (!existsInPO) {
        mismatchedItems++;

        audit.steps.push({
          step: "PO Validation",
          status: "ITEM_MISSING_IN_PO",
          message: `${cleanDescription(grnItem.description)} exists in GRN but not in PO`,
        });
        await exceptionService.createException({
          poNumber,
          vendorName: po.vendorName || "",
          type: "ITEM_MISSING_IN_PO",
          description: `${cleanDescription(grnItem.description)} exists in GRN but not in PO`,
          severity: "HIGH",
        });
      }
    }

    // ---------- Extra Invoice Items ----------

    for (const invoiceItem of invoice.items) {
      const existsInPO = po.items.some(
        (item) =>
          normalizeItemCode(item.itemCode) ===
          normalizeItemCode(invoiceItem.itemCode),
      );

      if (!existsInPO) {
        mismatchedItems++;

        audit.steps.push({
          step: "PO Validation",
          status: "ITEM_MISSING_IN_PO",
          message: `${cleanDescription(invoiceItem.description)} exists in Invoice but not in PO`,
        });
        await exceptionService.createException({
          poNumber,
          vendorName: po.vendorName || "",
          type: "ITEM_MISSING_IN_PO",
          description: `${cleanDescription(invoiceItem.description)} exists in Invoice but not in PO`,
          severity: "HIGH",
        });
      }
    }

    // ---------------- SUMMARY ----------------

    audit.summary = {
      totalItems: po.items.length,

      matchedItems,
      mismatchedItems,

      quantityMismatch,
      priceMismatch,
      mrpMismatch,

      unmappedSku,
      invoiceDateMismatch,

      missingInGRN,
      missingInInvoice,
    };

    // ---------------- SAVE / UPDATE AUDIT ----------------

    await MatchAudit.findOneAndUpdate({ poNumber }, audit, {
      upsert: true,
      new: true,
    });

    // ---------------- OVERALL STATUS ----------------

    let status;

    if (!po || !grn || !invoice) {
      status = "INSUFFICIENT_DOCUMENTS";
    } else if (matchedItems === po.items.length) {
      status = "MATCHED";
    } else if (matchedItems > 0) {
      status = "PARTIALLY_MATCHED";
    } else {
      status = "MISMATCH";
    }

    // ---------------- RESPONSE ----------------

    return res.json({
      success: true,
      poNumber,
      status,

      purchaseOrder: po,
      invoice,
      grn,

      comparison,

      summary: audit.summary,
      audit,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
