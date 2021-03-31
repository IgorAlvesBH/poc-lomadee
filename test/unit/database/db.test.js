const { EventEmitter } = require('events');
const { assert } = require('chai');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const database = require('../../../lib/database');
const Db = require('../../../lib/database/db');
const conf = require('../../../lib/conf');

describe('Database - Unit tests case', async () => {
  describe('Error on connect', () => {
    const connectPrototype = Db.prototype.connect;
    before(() => {
      Db.prototype.connect = () => Promise.reject(new Error('Error to connect'));
    });
    after(() => {
      Db.prototype.connect = connectPrototype;
    });
    it('Error on get connection', async () => {
      try {
        await database.connect();
        throw new Error('should not pass');
      } catch (e) {
        assert.strictEqual(e.message, 'Error to connect');
      }
    });
  });
  describe('Error on close', async () => {
    const closePrototype = Db.prototype.close;
    before(() => {
      Db.prototype.close = () => Promise.reject(new Error('Error to close connection'));
    });
    after(() => {
      Db.prototype.close = closePrototype;
    });
    it('Error on close connection', async () => {
      try {
        await database.close();
        throw new Error('should not pass');
      } catch (e) {
        assert.strictEqual(e.message, 'Error to close connection');
      }
    });
  });
  describe('Db class unit tests', () => {
    it('Should wait the database response if the connection was already requested', async () => {
      const dbInstance = new Db();
      const mongoClientMock = Object.create(EventEmitter.prototype);
      mongoClientMock.isConnected = () => false;
      dbInstance.client = mongoClientMock;
      const promise1 = dbInstance.connect('', {});
      const promise2 = dbInstance.connect('', {});
      mongoClientMock.emit('serverOpening');
      await Promise.all([promise1, promise2]);
    });
    it('Should return immediately close requests if the database client is not defined', async () => {
      const dbInstance = new Db();
      dbInstance.collections.clear = sinon.spy();
      await dbInstance.close();
      assert.isFalse(dbInstance.collections.clear.called);
    });
    it('Should return immediately close requests if the database client is not connected', async () => {
      const dbInstance = new Db();
      dbInstance.client = {
        isConnected: () => false
      };
      dbInstance.collections.clear = sinon.spy();
      await dbInstance.close();
      assert.isFalse(dbInstance.collections.clear.called);
    });
    describe('MongoClient errors', () => {
      const sandBox = sinon.createSandbox();
      afterEach(() => sandBox.restore());
      it('Error on method: connect', async () => {
        sandBox
          .stub(MongoClient.prototype, 'connect')
          .callsFake(() => new Promise((resolve, reject) => {
            setImmediate(() => reject(new Error('connect custom error')));
          }));
        const dbInstance = new Db();
        try {
          await dbInstance.connect('', {});
          throw new Error('should not pass');
        } catch (e) {
          assert.strictEqual(e.message, 'connect custom error');
        }
      });
      it('Error on method: close', async () => {
        sandBox
          .stub(MongoClient.prototype, 'close')
          .callsFake(() => new Promise((resolve, reject) => {
            setImmediate(() => reject(new Error('close custom error')));
          }));
        sandBox
          .stub(MongoClient.prototype, 'isConnected')
          .callsFake(() => true);
        const dbInstance = new Db();
        dbInstance.client = new MongoClient(conf.get('MONGODB_URI'), {});
        try {
          await dbInstance.close();
          throw new Error('should not pass');
        } catch (e) {
          assert.strictEqual(e.message, 'close custom error');
        }
      });
    });
  });
});
