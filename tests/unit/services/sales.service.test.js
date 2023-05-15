const { expect } = require('chai');
const sinon = require('sinon');
const { salesService } = require('../../../src/services');
const { salesModel, productsModel } = require('../../../src/models');
const { sale, saleCreated, invalidQuantity } = require('../controllers/mocks/sales.controller.mock');
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

  afterEach(function () {
    sinon.restore();
  });
});
