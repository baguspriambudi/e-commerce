process.env.NODE_ENV = 'test';
const server = require('../main');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');

chai.use(chaiHttp);

describe('API Test', () => {
  describe('GET /', () => {
    it('should return ok', async () => {
      const res = await chai.request(server).get('/');

      expect(res.status).to.equal(200);
      expect(res.body.status).to.equal(200);
      expect(res.body.message).to.equal('e-commerce service up and running!');
      expect(res.body).to.have.property('timestamp');
    });
  });
});
