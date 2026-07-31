const Exception = require("../models/exception.model");

/**
 * Create a new exception
 */
exports.createException = async ({
  poNumber,
  vendorName,
  type,
  description,
  severity = "MEDIUM",
}) => {
  try {
    const existing = await Exception.findOne({
      poNumber,
      type,
      description,
      status: { $ne: "RESOLVED" },
    });

    if (existing) {
      return existing;
    }

    const exception = await Exception.create({
      poNumber,
      vendorName,
      type,
      description,
      severity,
    });

    return exception;
  } catch (error) {
    throw error;
  }
};

/**
 * Get all exceptions
 */
exports.getAllExceptions = async (filters = {}) => {
  return await Exception.find(filters).sort({ createdAt: -1 });
};

/**
 * Get exception by ID
 */
exports.getExceptionById = async (id) => {
  return await Exception.findById(id);
};

/**
 * Get exceptions by PO Number
 */
exports.getExceptionsByPoNumber = async (poNumber) => {
  return await Exception.find({ poNumber }).sort({ createdAt: -1 });
};

/**
 * Get exceptions by Status
 */
exports.getExceptionsByStatus = async (status) => {
  return await Exception.find({ status }).sort({ createdAt: -1 });
};

/**
 * Resolve exception
 */
exports.resolveException = async (id, remarks, resolvedBy = "System") => {
  return await Exception.findByIdAndUpdate(
    id,
    {
      status: "RESOLVED",
      remarks,
      resolvedBy,
      resolvedAt: new Date(),
    },
    {
      new: true,
    },
  );
};

/**
 * Delete Exception
 */
exports.deleteException = async (id) => {
  return await Exception.findByIdAndDelete(id);
};
