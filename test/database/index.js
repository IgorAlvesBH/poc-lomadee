const conf = require('../../lib/conf');
const database = require('../../lib/database');
const Db = require('../../lib/database/db');

const mongo = (() => {
  const dropDatabase = async () => {
    await database.close();
    const dbInstance = new Db();
    await dbInstance.connect(conf.get('MONGODB_URI'));
    await dbInstance.db.dropDatabase();
    await dbInstance.close();
  };

  const clearCollections = async (...names) => {
    const proms = names.map((n) => database
      .getCollection(n)
      .deleteMany({})
      .catch(() => {}));
    return Promise.all(proms);
  };

  return {
    dropDatabase,
    clearCollections
  };
})();

module.exports = mongo;
