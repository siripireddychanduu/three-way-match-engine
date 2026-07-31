const exceptionService = require("../services/exception.service");

/**
 * Get All Exceptions
 * GET /api/exceptions
 */
exports.getAllExceptions = async (req, res) => {
  try {
    const exceptions = await exceptionService.getAllExceptions();

    return res.status(200).json({
      success: true,
      count: exceptions.length,
      data: exceptions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get Exception By ID
 * GET /api/exceptions/:id
 */
exports.getExceptionById = async (req, res) => {
  try {
    const exception = await exceptionService.getExceptionById(req.params.id);

    if (!exception) {
      return res.status(404).json({
        success: false,
        message: "Exception not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: exception,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get Exceptions By PO Number
 * GET /api/exceptions/po/:poNumber
 */
exports.getExceptionsByPoNumber = async (req, res) => {
  try {
    const exceptions = await exceptionService.getExceptionsByPoNumber(
      req.params.poNumber,
    );

    return res.status(200).json({
      success: true,
      count: exceptions.length,
      data: exceptions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get Exceptions By Status
 * GET /api/exceptions/status/:status
 */
exports.getExceptionsByStatus = async (req, res) => {
  try {
    const exceptions = await exceptionService.getExceptionsByStatus(
      req.params.status,
    );

    return res.status(200).json({
      success: true,
      count: exceptions.length,
      data: exceptions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Resolve Exception
 * PUT /api/exceptions/:id/resolve
 */
exports.resolveException = async (req, res) => {
  try {
    const { remarks, resolvedBy } = req.body;

    const exception = await exceptionService.resolveException(
      req.params.id,
      remarks,
      resolvedBy,
    );

    if (!exception) {
      return res.status(404).json({
        success: false,
        message: "Exception not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Exception resolved successfully",
      data: exception,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Delete Exception
 * DELETE /api/exceptions/:id
 */
exports.deleteException = async (req, res) => {
  try {
    const exception = await exceptionService.deleteException(req.params.id);

    if (!exception) {
      return res.status(404).json({
        success: false,
        message: "Exception not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Exception deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
