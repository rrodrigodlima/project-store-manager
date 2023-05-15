const { salesModel, productsModel } = require('../models');
const schema = require('./validations/validationsInputValues');

const createSale = async (itemsSold) => {
  const error = await schema.validateNewSale(itemsSold);
  if (error.type) return error;

  const promises = itemsSold.map(async ({ productId }) => {
    const [response] = await productsModel.selectById(productId);
    return !response ? 'notFound' : 'found';
  });
  const promiseALL = await Promise.all(promises);

  if (promiseALL.includes('notFound')) {
    return {
      type: 'PRODUCT_NOT_FOUND',
      message: 'Product not found',
    };
  }

  const id = await salesModel.insert(itemsSold);

  return { type: null, message: { id, itemsSold } };
};

module.exports = { createSale };