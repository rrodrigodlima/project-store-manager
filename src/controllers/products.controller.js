const { productsService } = require('../services');
const errorMap = require('../utils/errorMap');

const listProducts = async (_req, res) => {
  const { type, message } = await productsService.findAll();

  if (type) return res.status(errorMap.mapError(type)).json(message);

  res.status(200).json(message);
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.findById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(200).json(message);
};

const registerProduct = async (req, res) => {
  const { name } = req.body;

  const { type, message } = await productsService.registerProduct({ name });

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(201).json(message);
};

const editProduct = async (req, res) => {
  const { id } = req.params;
  const update = req.body;

  const { type, message } = await productsService.updateProduct(id, update);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(200).json(message);
};

module.exports = {
  listProducts,
  getProduct,
  registerProduct,
  editProduct,
};