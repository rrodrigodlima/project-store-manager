const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chai = require('chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const { saleCreated, invalidQuantity, sale } = require('./mocks/sales.controller.mock');

describe('Teste de unidade do salesController', () => {
  describe('Create product', () => {
    it('Deve retornar o status 201 e o product', async () => {
      const res = {};
      const req = { body: sale };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'createSale')
        .resolves({ type: null, message: saleCreated });

      await salesController.createSale(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(saleCreated);
    });
  });
  it('Retorna status 422 um erro quando "quantity" é menor ou igual a zero', async () => {
    const res = {};
    const req = { body: invalidQuantity };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(salesService, 'createSale')
      .resolves({ type: 'INVALID_VALUE', message: '"quantity" must be greater than or equal to 1' });

    await salesController.createSale(req, res);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"quantity" must be greater than or equal to 1' });
  });
  afterEach(function () {
    sinon.restore();
  });
});