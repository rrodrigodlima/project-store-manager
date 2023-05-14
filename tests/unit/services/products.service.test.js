const { expect } = require('chai');
const sinon = require('sinon');
const { productsService } = require('../../../src/services');
const { productsModel } = require('../../../src/models');
const { allProducts } = require('./mocks/products.service.mock');

describe('Verificando service products', function () {
  describe('listagem de products', function () {
    it('retorna a lista completa de products', async function () {
      // arrange
      sinon.stub(productsModel, 'findAll').resolves(allProducts);
      // act
      const result = await productsService.findAll();
      // assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(allProducts);
    });
  });

  describe('busca de um product', function () {
    it('retorna um erro caso receba um ID inválido', async function () {
      // act
      const result = await productsService.findById('a');
      // assert
      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"id" must be a number');
    });

    it('retorna um erro caso o product não exista', async function () {
      // arrange
      sinon.stub(productsModel, 'findById').resolves(undefined);
      // act
      const result = await productsService.findById(1);
      // assert
      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.equal('Product not found');
    });

    it('retorna o product caso ID existente', async function () {
      // arrange
      sinon.stub(productsModel, 'findById').resolves(allProducts[0]);
      // act
      const result = await productsService.findById(1);
      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(allProducts[0]);
    });
  });
  
  afterEach(function () {
    sinon.restore();
  });
});
