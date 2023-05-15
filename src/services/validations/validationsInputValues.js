const { idSchema, addProductSchema, addSaleSchema } = require('./schemas');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: '"id" must be a number' };

  return { type: null, message: '' };
};

const validateNewProduct = (product) => {
  const { error } = addProductSchema.validate(product);
  if (error) {
    return { type: 'INVALID_VALUE', message: '"name" length must be at least 5 characters long' };
  }
  return { type: null, message: '' };
};

const validateNewSale = async (itemsSold) => {
  const { error } = addSaleSchema.validate(itemsSold);
  if (error) {
    return {
      type: 'INVALID_VALUE',
      message: error.message.replace(/\[\d\]./, ''),
    };
  }

  return { type: null, message: '' };
};

module.exports = {
  validateId,
  validateNewProduct,
  validateNewSale,
};