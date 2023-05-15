const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');


const { expect } = chai;
chai.use(sinonChai);

const validateNewSaleFields = require('../../../src/middlewares/validateNewSaleFields');

const missingIdMock = [
  {
    quantity: 1,
  },
];

const missingQuantityMock = [
  {
    productId: 1,
  },
];

const validInputs = [
  {
    productId: 1,
    quantity: 1,
  },
];

describe('Teste de unidade do middleware validateNewSaleFields', function () {
  it('Retorna status 400 um erro quando "productId" não é inserido', async () => {
    const res = {};
    const req = { body: missingIdMock };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    validateNewSaleFields(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ type: 'FIELD_NOT_FOUND', message: '"productId" is required' });
  });
  it('Retorna status 400 um erro quando "quantity" não é inserido', async () => {
    const res = {};
    const req = { body: missingQuantityMock };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    validateNewSaleFields(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ type: 'FIELD_NOT_FOUND', message: '"quantity" is required' });
  });

  it('Passando os dados corretamente chama o próximo middleware', async function () {
    const res = {};
    const req = {
      body: validInputs
    };

    const next = sinon.stub().returns();

    await validateNewSaleFields(req, res, next);

    expect(next).to.have.been.calledWith();
  });

  afterEach(sinon.restore);
});
