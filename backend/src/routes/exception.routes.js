const express = require("express");

const router = express.Router();

const exceptionController = require("../controllers/exception.controller");

// More specific routes first
router.get("/po/:poNumber", exceptionController.getExceptionsByPoNumber);

router.get("/status/:status", exceptionController.getExceptionsByStatus);

// General route
router.get("/", exceptionController.getAllExceptions);

// ID route should be last among GET routes
router.get("/:id", exceptionController.getExceptionById);

// Update
router.put("/:id/resolve", exceptionController.resolveException);

// Delete
router.delete("/:id", exceptionController.deleteException);

module.exports = router;
