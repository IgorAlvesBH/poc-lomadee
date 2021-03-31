const healthStatusController = require('./health-status-controller');

const healthStatusRoutes = (router) => {
  router.get('/health-status', healthStatusController.get);
};

module.exports = healthStatusRoutes;
