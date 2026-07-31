const skuService = require("../services/sku.service");

exports.create = async (req, res) => {
  try {
    const sku = await skuService.createSku(req.body);
    res.status(201).json(sku);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

exports.getAll = async (req, res) => {
  const data = await skuService.getAllSku();
  res.json(data);
};

exports.getById = async (req, res) => {
  const sku = await skuService.getSkuById(req.params.id);

  if (!sku)
    return res.status(404).json({
      message: "SKU not found",
    });

  res.json(sku);
};

exports.update = async (req, res) => {
  const sku = await skuService.updateSku(req.params.id, req.body);

  res.json(sku);
};

exports.remove = async (req, res) => {
  await skuService.deleteSku(req.params.id);

  res.json({
    message: "Deleted Successfully",
  });
};
