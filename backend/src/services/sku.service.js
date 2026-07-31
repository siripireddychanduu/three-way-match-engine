const SkuMaster = require("../models/skuMaster.model");

const createSku = async (data) => {
  return await SkuMaster.create(data);
};

const getAllSku = async () => {
  return await SkuMaster.find().sort({ createdAt: -1 });
};

const getSkuById = async (id) => {
  return await SkuMaster.findById(id);
};

const updateSku = async (id, data) => {
  return await SkuMaster.findByIdAndUpdate(id, data, { new: true });
};

const deleteSku = async (id) => {
  return await SkuMaster.findByIdAndDelete(id);
};

module.exports = {
  createSku,
  getAllSku,
  getSkuById,
  updateSku,
  deleteSku,
};
