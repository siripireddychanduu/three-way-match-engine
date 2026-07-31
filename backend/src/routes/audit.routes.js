const express = require("express");

const router = express.Router();

const auditController = require("../controllers/audit.controller");

router.get("/", auditController.getAllAudits);

router.get("/:poNumber", auditController.getAuditByPo);

module.exports = router;
