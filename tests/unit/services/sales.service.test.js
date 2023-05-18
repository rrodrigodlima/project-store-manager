const { expect } = require('chai');
const sinon = require('sinon');
const { salesService } = require('../../../src/services');
const { salesModel, productsModel } = require('../../../src/models');
const { sale, saleCreated, invalidQuantity, saleSuccessful, saleByIdSuccessful } = require('../controllers/mocks/sales.controller.mock');
const { productNotFound, notFoundError } = require('./mocks/sales.service.mock');
const { saleByIdResponse } = require('../models/mocks/sales.model.mock');


describe('Verificando service sales', function () {
  describe('Create sale', function () {
    it('Retorna a sale se tiver sucesso', async () => {
      const productStub = sinon.stub(productsModel, 'selectById');

      productStub.withArgs(1).resolves([{ id: 1, name: 'Mustang' }]);
      productStub.withArgs(2).resolves([{ id: 2, name: 'Porche' }]);

      sinon.stub(salesModel, 'insert').resolves(93);
      const result = await salesService.createSale(sale);

      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(saleCreated);
    });

    it('Retorna status 404 um erro', async () => {
      const productStub = sinon.stub(productsModel, 'selectById');

      productStub.withArgs(1).resolves([{ id: 1, name: 'Mustang' }]);
      productStub.withArgs(999).resolves([]);

      const result = await salesService.createSale(productNotFound);

      expect(result.type).to.be.equal(notFoundError.type);
      expect(result.message).to.deep.equal(notFoundError.message);
    });

    it('Retorna status 422 um erro quando "quantity" é menor ou igual a zero', async () => {
      const result = await salesService.createSale(invalidQuantity);
      expect(result.type).to.be.equal('INVALID_VALUE');
      expect(result.message).to.deep.equal('"quantity" must be greater than or equal to 1');
    });
  });

  describe('Get all sales', () => {
    it('Retorna todas as sales', async () => {
      sinon.stub(salesModel, 'findAll').resolves(saleSuccessful);

      const result = await salesService.findAllSales();

      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(saleSuccessful);
    });
  });

  describe('Get sales by id', () => {
    it('Retorna a sale', async () => {
      sinon.stub(salesModel, 'selectById').resolves(saleByIdSuccessful);

      const result = await salesService.findSaleById(1);

      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(saleByIdSuccessful);
    });
    
    it('Retorna um erro 404 se a sale não for encontrada', async () => {
      sinon.stub(salesModel, 'selectById').resolves({});

      const result = await salesService.findSaleById(666);

      expect(result.type).to.be.equal('REQUEST_NOT_FOUND');
      expect(result.message).to.deep.equal('Sale not found');
    });

    it('Retorna um erro 422 se o id for inválido', async () => {
      const result = await salesService.findSaleById('invalidId');

      expect(result.type).to.be.equal('INVALID_VALUE');
      expect(result.message).to.deep.equal('"id" must be a number');
    });
  });

  describe('Delete sale by id', () => {
    it('Deletando com sucesso', async () => {
      sinon.stub(salesModel, 'selectById').resolves(saleByIdSuccessful);
      sinon.stub(salesModel, 'deleteById').resolves({});

      const result = await salesService.deleteSale(1);

      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal({});
    });

    it('Retorna um erro se receber um id inválido', async () => {
      sinon.stub(salesModel, 'deleteById').resolves({});

      const result = await salesService.deleteSale('invalidID');

      expect(result.type).to.be.equal('INVALID_VALUE');
      expect(result.message).to.deep.equal('"id" must be a number');
    });
    
    it('Retorna um erro se a sale não for encontrada', async () => {
      sinon.stub(salesModel, 'selectById').resolves([]);

      const result = await salesService.deleteSale(666);

      expect(result.type).to.be.equal('REQUEST_NOT_FOUND');
      expect(result.message).to.deep.equal('Sale not found');
    });
  });

  describe('Update sale by id', () => {
    it('Atualizando uma sale com sucesso', async () => {
      sinon.stub(salesModel, 'selectById').resolves(saleByIdSuccessful);
      sinon.stub(productsModel, 'selectById').resolves([{ id: 1, name: 'Mustang' }]);
      sinon.stub(salesModel, 'updateById').resolves([{ productId: 1, quantity: 10 }, { productId: 2, quantity: 20 }]);

      const result = await salesService.updateSale(1, [{ productId: 1, quantity: 10 }, { productId: 2, quantity: 20 }]);

      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal({
        "saleId": 1,
        "itemsUpdated": [
          { "productId": 1, "quantity": 10 },
          { "productId": 2, "quantity": 20 },
        ],
      });
    });

    it('Se o id for inválido retorna um erro', async () => {
      sinon.stub(salesModel, 'updateById').resolves({});

      const result = await salesService.updateSale('xx');

      expect(result.type).to.be.equal('INVALID_VALUE');
      expect(result.message).to.deep.equal('"id" must be a number');
    });

    it('Retorna erro caso a sale não exista', async () => {
      sinon.stub(salesModel, 'selectById').resolves([]);

      const result = await salesService.updateSale(666, [{ productId: 1, quantity: 10 }, { productId: 2, quantity: 20 }]);

      expect(result.type).to.be.equal('REQUEST_NOT_FOUND');
      expect(result.message).to.deep.equal('Sale not found');
    });

    it('Retorna um erro caso a sale não seja encontrada', async () => {
      sinon.stub(salesModel, 'selectById').resolves(saleByIdResponse);

      const productStub = sinon.stub(productsModel, 'selectById');
      productStub.withArgs(1).resolves([{ id: 1, name: 'Mustang' }]);
      productStub.withArgs(666).resolves([]);

      const result = await salesService.updateSale(1, [{ productId: 1, quantity: 1 }, { productId: 666, quantity: 2 }]);

      expect(result.type).to.be.equal('REQUEST_NOT_FOUND');
      expect(result.message).to.deep.equal('Product not found');
    });

    it('Retorna um erro caso falte algum dado', async () => {
      sinon.stub(salesModel, 'selectById').resolves(saleByIdResponse);

      const productStub = sinon.stub(productsModel, 'selectById');
      productStub.withArgs(1).resolves([{ id: 1, name: 'Mustang' }]);
      productStub.withArgs(2).resolves([{ id: 2, name: 'Porche' }]);

      const result = await salesService.updateSale(1, [{ productId: 1, quantity: 1 }, { productId: 2 }]);

      expect(result.type).to.be.equal('INVALID_VALUE');
      expect(result.message).to.deep.equal('"quantity" is required');
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});
