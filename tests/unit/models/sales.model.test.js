const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { sale } = require('../controllers/mocks/sales.controller.mock');

describe('Testes de unidade do model de sales', function () {
  it('Cadastrando uma sale', async () => {
    sinon.stub(connection, 'execute').resolves([{ insertId: 93 }]);
    const result = await salesModel.insert(sale);
    expect(result).to.be.deep.equal(93);
  });

  afterEach(function () {
    sinon.restore();
  });
});