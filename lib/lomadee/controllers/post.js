const healthStatusController = (() => {
  const postOffers = (req, res) => {
    console.log('Incomming request');
    res.sendStatus(202);
  };

  return {
    postOffers
  };
})();

module.exports = healthStatusController;
