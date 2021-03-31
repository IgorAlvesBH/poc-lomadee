const { dropDatabase } = require('./database');
const config = require('../lib/conf');
const database = require('../lib/database');

before('Sobrescreve a url do banco e incia a conexão do banco', async () => {
  config.set('MONGODB_URI', `${config.get('MONGODB_URI')}_test`);
  await database.connect();
});
after('Remove a base de dados usada para testes', () => dropDatabase());
