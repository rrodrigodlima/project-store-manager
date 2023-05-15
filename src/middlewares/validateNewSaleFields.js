const validateNewSaleFields = (req, res, next) => {
  const sale = req.body;

  const findProductId = sale.some(({ productId }) => Number.isInteger(productId));
  const findQuantity = sale.some(({ quantity }) => Number.isInteger(quantity));

  if (!findProductId) {
    return res.status(400).json({
      type: 'FIELD_NOT_FOUND',
      message: '"productId" is required',
    });
  }
  if (!findQuantity) {
    return res.status(400).json({
      type: 'FIELD_NOT_FOUND',
      message: '"quantity" is required',
    });
  }

  return next();
};

module.exports = validateNewSaleFields;