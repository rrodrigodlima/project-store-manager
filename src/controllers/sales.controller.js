const { salesService } = require('../services');
const errorMap = require('../utils/errorMap');

const createSale = async (req, res) => {
  const newSale = req.body;

  const { type, message } = await salesService.createSale(newSale);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(201).json(message);
};

const listSales = async (_req, res) => {
  const { type, message } = await salesService.findAllSales();

  if (type) return res.status(errorMap.mapError(type)).json(message);

  res.status(200).json(message);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await salesService.findSaleById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(200).json(message);
};

const removeSale = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await salesService.deleteSale(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.sendStatus(204);
};

const editSale = async (req, res) => {
  const { id } = req.params;

  const update = req.body;

  const { type, message } = await salesService.updateSale(id, update);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(200).json(message);
};

module.exports = {
  createSale,
  listSales,
  getById,
  removeSale,
  editSale,
};