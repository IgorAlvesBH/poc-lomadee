const lomadeeController = (() => {
  const getOffersWithDeepLink = async (req, res) => {
    console.log('Incomming request');
    res.sendStatus(202);
  };

  return {
    getOffersWithDeepLink
  };
})();

module.exports = lomadeeController;
