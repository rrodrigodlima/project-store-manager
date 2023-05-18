const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chai = require('chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const { saleCreated, invalidQuantity, sale, saleSuccessful, saleByIdSuccessful } = require('./mocks/sales.controller.mock');

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
  describe('Recebe todas as sales', () => {
    it('Retorna status 200 e as sales', async () => {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'findAllSales')
        .resolves({ type: null, message: saleSuccessful });

      await salesController.listSales(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(saleSuccessful);
    });
  });

  describe('Sales por Id', () => {
    it('Retorna status 200 e a sale', async () => {
      const res = {};
      const req = { params: { id: 1 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(salesService, 'findSaleById')
        .resolves({ type: null, message: saleByIdSuccessful });

      await salesController.getById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(saleByIdSuccessful);
    });

    it('Retorna status 404 e a sale', async () => {
      const res = {};
      const req = { params: { id: 1 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(salesService, 'findSaleById')
        .resolves({ type: 'REQUEST_NOT_FOUND', message: 'Sale not found' });

      await salesController.getById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });
  });

  describe('Remove sale', () => {
    it('Retorna 204 quando deleta a sale com sucesso', async () => {
      const res = {
        sendStatus: sinon.stub({ sendStatus: (status) => status }, 'sendStatus').returns(204)
      };
      const req = { params: { id: 1 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(salesService, 'deleteSale')
        .resolves({ type: null, message: {} });

      await salesController.removeSale(req, res);

      expect(res.sendStatus).to.have.been.calledWith(204);
    });
    
    it('Retorna 422 quando o id é inválido', async () => {
      const res = {};
      const req = { params: { id: 'xxx' } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(salesService, 'deleteSale')
        .resolves({ type: 'INVALID_VALUE', message: '"id" must be a number' });

      await salesController.removeSale(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"id" must be a number' });
    });
    
    it('Retorna 404 quando o id não existe', async () => {
      const res = {};
      const req = { params: { id: 666 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      
      sinon
        .stub(salesService, 'deleteSale')
        .resolves({ type: 'REQUEST_NOT_FOUND', message: 'Sale not found' });

      await salesController.removeSale(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});