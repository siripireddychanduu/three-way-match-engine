const express = require("express");
const router = express.Router();

const skuController = require("../controllers/sku.controller");

router.post("/", skuController.create);

router.get("/", skuController.getAll);

router.get("/:id", skuController.getById);

router.patch("/:id", skuController.update);

router.delete("/:id", skuController.remove);

module.exports = router;
