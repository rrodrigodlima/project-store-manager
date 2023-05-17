const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chai = require('chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');
const { productListMock, newProductMock, productMock } = require('./mocks/products.controller.mock');

const validateNewProductFields = require('../../../src/middlewares/validateNewProductFields');



describe('Teste de unidade do productsController', function () {
  describe('Listando os products', function () {
    it('Deve retornar o status 200 e a lista', async function () {
      // arrange
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'findAll')
        .resolves({ type: null, message: productListMock });

      // act
      await productsController.listProducts(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productListMock);
    });
  });

  describe('Buscando um product', function () {
    it('deve responder com 200 e os dados do banco quando existir', async function () {
      // Arrange
      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'findById')
        .resolves({ type: null, message: newProductMock });

      // Act
      await productsController.getProduct(req, res);

      // Assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(newProductMock);
    });

    it('ao passar um id inválido deve retornar um erro', async function () {
      // Arrange
      const res = {};
      const req = {
        params: { id: 'abc' }, // passamos aqui um id inválido para forçar o erro esperado
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      // Definimos o dublê do service retornando o contrato definido.
      sinon
        .stub(productsService, 'findById')
        .resolves({ type: 'INVALID_VALUE', message: '"id" must be a number' });

      // Act
      await productsController.getProduct(req, res);

      // Assert
      // Avaliamos se chamou `res.status` com o valor 422
      expect(res.status).to.have.been.calledWith(422);
      // Avaliamos se chamou `res.status` com a mensagem esperada
      expect(res.json).to.have.been.calledWith({ message: '"id" must be a number' });
    });

    it('ao passar um id que não existe no banco deve retornar um erro', async function () {
      // Arrange
      const res = {};
      const req = {
        params: { id: 9999 }, // passamos aqui um id fictício para forçar o erro esperado
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      // Definimos o dublê do service retornando o contrato definido para esse cenário
      sinon
        .stub(productsService, 'findById')
        .resolves({ type: 'REQUEST_NOT_FOUND', message: 'Product not found' });

      // Act
      await productsController.getProduct(req, res);

      // Assert
      // Avaliamos se chamou `res.status` com o valor 404
      expect(res.status).to.have.been.calledWith(404);
      // Avaliamos se chamou `res.status` com a mensagem esperada
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });
  describe('Cadastrando uma novo product', function () {
    it('ao enviar dados válidos deve salvar com sucesso!', async function () {
      // Arrange
      const res = {};
      const req = {
        body: productMock,
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
       sinon
        .stub(productsService, 'registerProduct')
        .resolves({ type: null, message: newProductMock });

      // Act
      await productsController.registerProduct(req, res);

      // Assert
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(newProductMock);
    });

    it('ao enviar um nome com menos de 5 caracteres deve retornar um erro!', async function () {
      // Arrange
      const res = {};
      /* Aqui mudamos o dublê de req.body com um valor inválido para o campo name */
      const req = {
        body: {
          name: 'fake',
        },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'registerProduct')
        .resolves({
          type: 'INVALID_VALUE', message: '"name" length must be at least 5 characters long',
        });

      // Act
      await productsController.registerProduct(req, res);

      // Assert
      /* O status HTTP retornado deve ser 422 */
      expect(res.status).to.have.been.calledWith(422);
      /* Ajustamos a mensagem de erro esperada para ser a mensagem gerada pelo service */
      expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
    });
  });

  describe('Update product tests', () => {
    it('deve responder com 200 e produto alterado', async () => {
      const res = {};
      const req = { body: { name: 'Mustang' }, params: { id: 1 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'updateProduct')
        .resolves({ type: null, message: { id: 1, name: 'Corolla' } });

      await productsController.editProduct(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({ id: 1, name: 'Corolla' });
    });

    it('deve responder com 400 erro caso o nome esteja faltando', async () => {
      const res = {};
      const req = { body: {}, params: { id: 1 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      validateNewProductFields(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ type: 'FIELD_NOT_FOUND', message: '"name" is required' });
    });

    it('deve responder erro 422 quando o nome tiver menos que 5 caracteres ', async () => {
      const res = {};
      const req = { body: { name: 'aa' }, params: { id: 1 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productsService, 'updateProduct')
        .resolves({ type: 'INVALID_VALUE', message: '"name" length must be at least 5 characters long' });

      await productsController.editProduct(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
    });

    it('deve responder com erro 404 quando o id for invalido', async () => {
      const res = {};
      const req = { body: { name: 'Corolla' }, params: { id: 666 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      
      sinon
        .stub(productsService, 'updateProduct')
        .resolves({ type: 'REQUEST_NOT_FOUND', message: 'Product not found' });

      await productsController.editProduct(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});
