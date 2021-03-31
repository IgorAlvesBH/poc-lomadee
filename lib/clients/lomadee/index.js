const conf = require('../../conf');

const lomadeeClient = (() => {
  const getOffers = () => {
    console.log('Incomming request');
    res.sendStatus(202);
  };

  return {
    getOffers
  };
})();

module.exports = lomadeeClient;
