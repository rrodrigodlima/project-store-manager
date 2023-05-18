const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { sale } = require('../controllers/mocks/sales.controller.mock');
const { saleDB, saleByIdDB, saleByIdResponse, saleResponse } = require('./mocks/sales.model.mock');

describe('Testes de unidade do model de sales', function () {
  it('Cadastrando uma sale', async () => {
    sinon.stub(connection, 'execute').resolves([{ insertId: 93 }]);
    const result = await salesModel.insert(sale);
    expect(result).to.be.deep.equal(93);
  });

  it('Selecionando uma sale', async () => {
    sinon.stub(connection, 'execute').resolves(saleDB);

    const result = await salesModel.findAll();
    
    expect(result).to.be.deep.equal(saleResponse);
  });

  it('Selecionando uma sale por id', async () => {
    sinon.stub(connection, 'execute').resolves(saleByIdDB);

    const result = await salesModel.selectById(1);

    expect(result).to.be.deep.equal(saleByIdResponse);
  });

  it('Deletando uma sale', async () => {

    sinon.stub(connection, 'execute').resolves([{}]);

    const result = await salesModel.deleteById(1);

    expect(result).to.be.deep.equal({});
  });

  afterEach(function () {
    sinon.restore();
  });
});