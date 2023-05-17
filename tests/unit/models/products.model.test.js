const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { products, newProduct } = require('./mocks/products.model.mock');

describe('Testes de unidade do model de products', function () {
  it('Recuperando a lista de products', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([products]);
    // Act
    const result = await productsModel.findAll();
    // Assert
    expect(result).to.be.deep.equal(products);
  });

  it('Recuperando um product a partir do seu id', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([[products[0]]]);
    // Act
    const result = await productsModel.findById(1);
    // Assert
    expect(result).to.be.deep.equal(products[0]);
  });

  it('Cadastrando um product', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([{ insertId: 42 }]);
    // Act
    const result = await productsModel.insert(newProduct);
    // Assert
    expect(result).to.equal(42);
  });

  it('Editando um produto', async () => {

    sinon.stub(connection, 'execute').resolves({ id: 1, name: 'Mustang' });

    const result = await productsModel.updateProductById(1, { name: 'Mustang' });

    expect(result).to.be.deep.equal({ id: 1, name: 'Mustang' });
  });

  afterEach(function () {
    sinon.restore();
  });
});