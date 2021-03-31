const lomadeeController = require('./controllers');

const lomadeeRoutes = (router) => {
  router.post('/lomadee/offers', lomadeeController.postOffers);
};

module.exports = lomadeeRoutes;
