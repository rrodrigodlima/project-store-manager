const productMock = {
  name: 'RTX 4090',
};

const newProductMock = { id: 1, ...productMock };

const productListMock = [newProductMock];

module.exports = {
  productMock,
  newProductMock,
  productListMock,
};