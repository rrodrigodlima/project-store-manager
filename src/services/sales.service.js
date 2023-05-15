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

const findAllSales = async () => {
  const sales = await salesModel.findAll();
  return { type: null, message: sales };
};

const findSaleById = async (saleId) => {
  const error = schema.validateId(saleId);
  if (error.type) return error;

  const sale = await salesModel.selectById(saleId);
  if (!sale.length) return { type: 'REQUEST_NOT_FOUND', message: 'Sale not found' };

  return { type: null, message: sale };
};

module.exports = {
  createSale,
  findAllSales,
  findSaleById,
};