const lomadeeController = require('./controllers');

const lomadeeRoutes = (router) => {
  router.get('/lomadee/offers/deeplink', lomadeeController.getOffersWithDeepLink);
};

module.exports = lomadeeRoutes;
