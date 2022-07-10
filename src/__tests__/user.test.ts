import chai from 'chai';
import sinon from 'sinon';
import chaiHttp from 'chai-http';
import UserRepository from '../user/repository';
import app from '../app'; //{1}
import * as fakeData from './fakeData'; //{2}
import Logger from '../utils/logger';

//{3}
chai.use(chaiHttp);
const { expect } = chai;

//{4}
describe('GET /user', () => {
  describe('em caso de sucesso', () => {
    //{5}
    before(() => {
      // Simula métodos não estáticos (Classe.prototype, 'método')
      sinon
        .stub(UserRepository.prototype, 'getAll')
        .resolves(fakeData.get.mock);
      // Simula o metodos staticos da classe: (Classe, 'metodo')
      sinon.stub(Logger, 'save').resolves();
    });

    //{6}
    after(() => {
      // teardown de métodos não estáticos: (Classe.prototype.metodo as sinon.SinonStub)
      (UserRepository.prototype.getAll as sinon.SinonStub).restore();
      // teardown de métodos estáticos: (Classe.método as sinon.SinonStub)
      (Logger.save as sinon.SinonStub).restore();
    });

    //{7}
    it('deve retornar um array de usuários e enviar status 200', async () => {
      // Faz a requisição para rota GET
      const { status, body } = await chai.request(app).get('/user');

      expect(status).to.be.equal(200); // testa se o status é 200
      expect(body).to.be.an('array'); // testa se o body da resposta é um array
      expect(body).to.be.deep.equal(fakeData.get.response); // testa se o body é estritamente igual ao esperado
      // testa se Logger.save foi chamado como: Logger.save('getAll() success')
      expect((Logger.save as sinon.SinonStub).calledWith('getAll() success')).to
        .be.true;
    });
  });

  /*
    {1} = Import do app express para fazer as requisições
    {2} = Arquivo usado para agrupar os mocks, requests e responses
    {3} = Insere o plugin chai-http para ser usado pelo chai e pega o expect que é o que será usado
    {4} = `describe` é usado par criar o contexto de testes. Agrupa before, after e it isolando os testes
    {5} = `before` executa uma callback antes do teste; Aqui ele faz o setup criando a simulação de UserRepository e Logger
    {6} = `after` executa uma challback depois do teste; Aqui é usado para reverter (teardown) o que foi simulado para eviter efeitos colaterais
    {7} = `it` realiza o teste em si
  */

  describe('em caso de erro no banco de dados', () => {
    before(() => {
      sinon
        .stub(UserRepository.prototype, 'getAll')
        .throws(new Error('db error'));
      sinon.stub(Logger, 'save').resolves();
    });
    after(() => {
      (UserRepository.prototype.getAll as sinon.SinonStub).restore();
      (Logger.save as sinon.SinonStub).restore();
    });

    it('deve retornar a mensagem de erro e enviar status 500', async () => {
      const { status, body } = await chai.request(app).get('/user');
      expect(status).to.be.equal(500);
      expect(body).to.have.property('error');
      expect(body.error.message).to.be.equal('db error');
      expect((Logger.save as sinon.SinonStub).calledWith('getAll() fail')).to.be
        .true;
    });
  });
});

describe('PUT /user/:id', () => {
  describe('caso o usuário exista', () => {
    before(() => {
      sinon
        //{1}
        .stub(UserRepository.prototype, 'update')
        .resolves(fakeData.put.mock);
      sinon
        // {2}
        .stub(UserRepository.prototype, 'getById')
        .resolves(fakeData.put.getByIdMock);

      sinon.stub(Logger, 'save').resolves();
    });

    after(() => {
      //{3}
      (UserRepository.prototype.update as sinon.SinonStub).restore();
      (UserRepository.prototype.getById as sinon.SinonStub).restore();
      (Logger.save as sinon.SinonStub).restore();
    });

    it('deve retornar o usuário atualizado e enviar status 200', async () => {
      const { status, body } = await chai
        .request(app)
        .put('/user/2')
        .send(fakeData.put.request); // o método `send` serve para evitar um body na requisição
      expect(status).to.be.equal(200); // testa se o status é o esperado
      expect(body).to.be.an('object'); // testa se a resposta é um objeto
      expect(body).to.be.deep.equal(fakeData.put.response); // testa se o body é estritamente iqual ao que se espera
      expect((Logger.save as sinon.SinonStub).calledWith('update() success')).to
        .be.true; // testa se o Logger foi chamado corretmente
    });
  });

  describe('caso o usuário não exista', () => {
    before(() => {
      sinon
        .stub(UserRepository.prototype, 'update')
        .resolves(fakeData.put.mock);
      sinon.stub(UserRepository.prototype, 'getById').resolves(null);
      sinon.stub(Logger, 'save').resolves();
    });
    after(() => {
      (UserRepository.prototype.update as sinon.SinonStub).restore();
      (UserRepository.prototype.getById as sinon.SinonStub).restore();
      (Logger.save as sinon.SinonStub).restore();
    });

    it('deve retornar a mensagem do erro e enviar status 404', async () => {
      const { status, body } = await chai
        .request(app)
        .put('/user/9999')
        .send(fakeData.put.mock);

      expect(status).to.be.equal(404);
      expect(body).to.have.property('error');
      expect(body.error.message).to.be.equal('user not found');
      expect((Logger.save as sinon.SinonStub).calledWith('update() fail')).to.be
        .true;
    });
  });
});

/*
  Próximos passos:
  - Criar outras rotas para a api e desenvolver testes para elas
  - Manter o container Mysql para evitar falsos-positivos
  - Em Post /user o service chama 2 metodos de repositório, então pense nisso quando criar mocks
  - Alimente o `fakeData` com mais objetos
*/
