const express = require("express");
const router = express.Router();
const matchController = require("../controllers/match.controller");

router.get("/:poNumber", matchController.getMatch);

module.exports = router;
