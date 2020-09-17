/* eslint-disable node/no-unpublished-require */
/* eslint-disable no-undef */
/* eslint-disable no-useless-catch */

process.env.NODE_ENV = 'test';
process.env.MONGODB_URI = 'mongodb://localhost/test_ecommerce';

const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');
const mongoose = require('mongoose');
const server = require('../main');
const User = require('../model/User');

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
        expect(res.body.status).to.equal(400);
        expect(res.body.message).to.equal('Validation Error');
        expect(res.body).to.have.property('error');
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

    it('should success register', async () => {
      try {
        const res = await chai
          .request(server)
          .post('/api/v1/auth/register/user')
          .send({ username: 'wildan', password: '123123' });

        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.message).to.equal('Data succesfully inputed');
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('username');
        expect(res.body.data.username).to.equal('wildan');
      } catch (error) {
        throw error;
      }
    });
  });

  describe('POST /api/v1/merchant/create', () => {
    it('should return error validation token', async () => {
      try {
        const res = await chai.request(server).post('/api/v1/merchant/create');
        expect(res.status).to.equal(403);
      } catch (error) {
        throw error;
      }
    });

    it('should return error validation schema', async () => {
      try {
        const register = await chai
          .request(server)
          .post('/api/v1/auth/register/user')
          .send({ username: 'wildan', password: '123123' });
        expect(register.status).to.equal(200);
        const login = await chai
          .request(server)
          .post('/api/v1/auth/login')
          .send({ username: 'wildan', password: '123123' });
        const token = login.body.data;
        const res = await chai.request(server).post('/api/v1/merchant/create').set('Authorization', `Bearer ${token}`);
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.message).to.equal('Validation Error');
        expect(res.body).to.have.property('error');
      } catch (error) {
        throw error;
      }
    });

    it('should error validation, username not found', async () => {
      try {
        await chai.request(server).post('/api/v1/auth/register/user').send({ username: 'wildan', password: '123123' });
        const login = await chai
          .request(server)
          .post('/api/v1/auth/login')
          .send({ username: 'wildan', password: '123123' });
        const token = login.body.data;
        await User.deleteOne({ username: 'wildan' });
        const res = await chai
          .request(server)
          .post('/api/v1/merchant/create')
          .set('Authorization', `Bearer ${token}`)
          .send({ name: 'Toktoktok', description: 'hehe', name_bank: 'BRI', rekening: '9847923473' });

        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal(404);
        expect(res.body.message).to.equal('User not found');
      } catch (error) {
        throw error;
      }
    });

    it('should error validation, user has have a merchant', async () => {
      try {
        await chai.request(server).post('/api/v1/auth/register/user').send({ username: 'wildan', password: '123123' });
        const login = await chai
          .request(server)
          .post('/api/v1/auth/login')
          .send({ username: 'wildan', password: '123123' });
        const token = login.body.data;
        await chai
          .request(server)
          .post('/api/v1/merchant/create')
          .set('Authorization', `Bearer ${token}`)
          .send({ name: 'Toktoktok', description: 'hehe', name_bank: 'BRI', rekening: '9847923473' });
        const res = await chai
          .request(server)
          .post('/api/v1/merchant/create')
          .set('Authorization', `Bearer ${token}`)
          .send({ name: 'Toktoktok', description: 'hehe', name_bank: 'BRI', rekening: '9847923473' });

        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.message).to.equal('user has have a merchant');
      } catch (error) {
        throw error;
      }
    });

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
          .set('Authorization', `Bearer ${token}`)
          .send({ name: 'Toktoktok', description: 'hehe', name_bank: 'BRI', rekening: '9847923473' });

        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.message).to.equal('Data merchant succesfull inputed, wait confirm from admin');
        expect(res.body).to.have.property('data');
      } catch (error) {
        throw error;
      }
    });
  });

  describe('POST /api/v1/product/create', () => {
    it('should return error validation token', async () => {
      try {
        const res1 = await chai.request(server).post('/api/v1/product/create');
        expect(res1.status).to.equal(403);
      } catch (error) {
        throw error;
      }
    });
  });
});
