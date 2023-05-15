const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const validateNewProductFields = require('../../../src/middlewares/validateNewProductFields');

const { expect } = chai;
chai.use(sinonChai);

const validName = 'Computador';

const errorMessage = { message: '"name" is required' };

describe('Teste de unidade do middleware validateNewProductFields', function () {
  it('Tentando cadastrar um novo product sem nome retorna erro', async function () {
    const res = {};
    const req = {
      body: {
      },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await validateNewProductFields(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith(errorMessage);
  });

   it('Passando os dados corretamente chama o próximo middleware', async function () {
    const res = {};
    const req = {
      body: {
        name: validName,
      },
    };

    const next = sinon.stub().returns();

     await validateNewProductFields(req, res, next);

    expect(next).to.have.been.calledWith();
  });

  afterEach(sinon.restore);
});
