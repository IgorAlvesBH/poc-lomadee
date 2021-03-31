const supertest = require('supertest');
const { assert } = require('chai');
const ip = require('ip');
const server = require('../../lib/server');
const packageInfo = require('../../package.json');

let app;

describe('Integration tests health status', () => {
  before(async () => {
    app = await server.start();
  });

  after(() => server.stop());

  it('Should return 200 when call health-status', async () => {
    await supertest(app)
      .get('/health-status')
      .set('Content-Type', 'application/json')
      .expect(200);
  });

  it('Should return the correct version in check-status', async () => {
    const result = await supertest(app)
      .get('/health-status')
      .set('Content-Type', 'application/json')
      .expect(200);

    assert.strictEqual(result.body.service, packageInfo.name);
    assert.strictEqual(result.body.version, packageInfo.version);
    assert.strictEqual(result.body.container, process.env.HOSTNAME);
    assert.isTrue(ip.isV4Format(result.body.ip));
  });
});
