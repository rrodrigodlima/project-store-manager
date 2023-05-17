const { productsModel } = require('../models');
const schema = require('./validations/validationsInputValues');

const findAll = async () => {
  const products = await productsModel.findAll();
  return { type: null, message: products };
};

const findById = async (productId) => {
  const error = schema.validateId(productId);
  if (error.type) return error;

  const product = await productsModel.findById(productId);
  if (!product) return { type: 'REQUEST_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: product };
};

const registerProduct = async (name) => {
  const error = schema.validateNewProduct(name);
  if (error.type) return error;

  const newProductId = await productsModel.insert(name);
  const newProduct = await productsModel.findById(newProductId);

  return { type: null, message: newProduct };
};

const updateProduct = async (productId, update) => {
  let error = await schema.validateProductExists([{ productId }]);
  if (error.type) return error;

  error = await schema.validateNewProduct(update);
  if (error.type) return error;

  await productsModel.updateProductById(productId, update);

  const [result] = await productsModel.selectById(productId);
  return { type: null, message: result };
};

const deleteProduct = async (productId) => {
  let error = schema.validateId(productId);
  if (error.type) return error;

  error = await schema.validateProductExists([{ productId }]);
  if (error.type) return error;

  const result = await productsModel.deleteById(productId);

  return { type: null, message: result };
};

module.exports = {
  findAll,
  findById,
  registerProduct,
  updateProduct,
  deleteProduct,
};
