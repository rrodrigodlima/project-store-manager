const { salesService } = require('../services');
const errorMap = require('../utils/errorMap');

const createSale = async (req, res) => {
  const newSale = req.body;

  const { type, message } = await salesService.createSale(newSale);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(201).json(message);
};

module.exports = {
  createSale,
};