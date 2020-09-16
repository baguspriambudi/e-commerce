process.env.NODE_ENV = 'test';
process.env.MONGODB_URI = 'mongodb://localhost/test_ecommerce';

const server = require('../main');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');
const mongoose = require('mongoose');

chai.use(chaiHttp);

describe('API Test', () => {
  afterEach('drop database test', async () => {
    await mongoose.connection.dropDatabase();
  });

  describe('GET /', () => {
    it('should return ok', async () => {
      try {
        const res = await chai.request(server).get('/');

        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.message).to.equal('e-commerce service up and running!');
        expect(res.body).to.have.property('timestamp');
      } catch (error) {
        throw error;
      }
    });
  });

  describe('POST /api/v1/auth/register/user', () => {
    it('should return error validation schema', async () => {
      try {
        const res = await chai.request(server).post('/api/v1/auth/register/user');
        expect(res.status).to.equal(400);
      } catch (error) {
        throw error;
      }
    });

    it('should success register', async () => {
      try {
        const res = await chai
          .request(server)
          .post('/api/v1/auth/register/user')
          .send({ username: 'wildan', password: '123123' });

        expect(res.status).to.equal(200);
      } catch (error) {
        throw error;
      }
    });

    it('should error validation, username already exist', async () => {
      try {
        await chai.request(server).post('/api/v1/auth/register/user').send({ username: 'wildan', password: '123123' });
        const res = await chai
          .request(server)
          .post('/api/v1/auth/register/user')
          .send({ username: 'wildan', password: '123123' });

        expect(res.status).to.equal(400);
      } catch (error) {
        throw error;
      }
    });
  });

  describe('POST /api/v1/merchant/create', () => {
    it('should successfully create merchant', async () => {
      try {
        await chai.request(server).post('/api/v1/auth/register/user').send({ username: 'wildan', password: '123123' });
        const login = await chai
          .request(server)
          .post('/api/v1/auth/login')
          .send({ username: 'wildan', password: '123123' });
        const token = login.body.data;

        const res = await chai
          .request(server)
          .post('/api/v1/merchant/create')
          .set('Authorization', 'Bearer ' + token)
          .send({ name: 'Toktoktok', description: 'hehe', name_bank: 'BRI', rekening: '9847923473' });

        expect(res.status).to.equal(200);
      } catch (error) {
        throw error;
      }
    });
  });
});
