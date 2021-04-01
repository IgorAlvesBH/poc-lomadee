const lomadeeController = require('./controllers');

const lomadeeRoutes = (router) => {
  router.get('/postback', lomadeeController.getPostBack);
  router.get('/offers/store/:storeId', lomadeeController.getOffersByStore)
};

module.exports = lomadeeRoutes;
