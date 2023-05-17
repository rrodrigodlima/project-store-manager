const { expect } = require('chai');
const sinon = require('sinon');

const { productsService } = require('../../../src/services');
const { productsModel } = require('../../../src/models');
const { allProducts, invalidValue, validName } = require('./mocks/products.service.mock');
const schema = require('../../../src/services/validations/validationsInputValues');

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
      expect(result.type).to.equal('REQUEST_NOT_FOUND');
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

  describe('cadastro de um product com valores inválidos', function () {
    it('retorna um erro ao passar um nome inválido', async function () {
      // act
      const result = await productsService.registerProduct(invalidValue);

      // assert
      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"name" length must be at least 5 characters long');
    });
  });

  describe('Editando um produto', () => {
    it('Retorna o produto editado', async () => {
      sinon.stub(schema, 'validateProductExists').resolves({ type: null, message: '' });
      sinon.stub(schema, 'validateNewProduct').resolves({ type: null, message: '' });
      sinon.stub(productsModel, 'selectById').resolves([{ id: 1, name: 'Mustang' }]);
      sinon.stub(productsModel, 'updateProductById').resolves({ id: 1, name: 'Mustang' });

      const result = await productsService.updateProduct(1, { name: "Mustang" });

      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal({ id: 1, name: "Mustang" });
    });

    it('Retorna um erro se receber productId inválido', async () => {
      sinon.stub(schema, 'validateProductExists').resolves({ type: 'REQUEST_NOT_FOUND', message: 'Product not found' });
      
      const result = await productsService.updateProduct(666, { name: "Mustang" });
      
      expect(result.type).to.be.equal('REQUEST_NOT_FOUND');
      expect(result.message).to.deep.equal('Product not found');
    });
    
    it('Retorna um erro se receber um nome inválido', async () => {
      sinon.stub(schema, 'validateProductExists').resolves({ type: null, message: '' });
      sinon.stub(schema, 'validateNewProduct').resolves({ type: 'INVALID_VALUE', message: '"name" length must be at least 5 characters long' });
      
      const result = await productsService.updateProduct(1, { name: "Mustang" });
      
      expect(result.type).to.be.equal('INVALID_VALUE');
      expect(result.message).to.deep.equal('"name" length must be at least 5 characters long');
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});
