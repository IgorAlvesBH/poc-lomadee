const Db = require('./db');
const conf = require('../conf');

const dbInstance = new Db();
module.exports = {
  async close() {
    try {
      if (dbInstance) {
        console.log('[MongoDB] Database trying to disconnect');
        await dbInstance.close();
      }
    } catch (e) {
      console.log('Error on close DB: %j', e);
      throw e;
    }
  },
  async connect() {
    try {
      await dbInstance.connect(conf.mongoUri);
      console.log('[MongoDB] Database connected');
    } catch (e) {
      console.log('[MongoDB] Database failed to connect - ', e.message);
      throw e;
    }
  },
  getCollection(name) {
    return dbInstance.getCollection(name);
  },
  ObjectId(idData) {
    return dbInstance.ObjectId(idData);
  }
};
