const { expect } = require('chai');
const sinon = require('sinon');
const { salesService } = require('../../../src/services');
const { salesModel, productsModel } = require('../../../src/models');
const { sale, saleCreated, invalidQuantity, saleSuccessful, saleByIdSuccessful } = require('../controllers/mocks/sales.controller.mock');
const { productNotFound, notFoundError } = require('./mocks/sales.service.mock');


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

  afterEach(function () {
    sinon.restore();
  });
});
