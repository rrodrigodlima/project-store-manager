const productNotFound = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 999,
    quantity: 2,
  },
];


const notFoundError = {
  type: 'REQUEST_NOT_FOUND',
  message: 'Product not found',
};

module.exports = {
  productNotFound,
  notFoundError
};