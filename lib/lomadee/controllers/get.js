const lomadeeServices = require('../services');

const lomadeeController = (() => {
  const getPostBack = async (req, res) => {
    const { transaction, adv, associationID, totalValue, totalCommiss } = req.query;
    console.log('transaction: %s, adv: %s, associationID: %s, totalValue: %s, totalCommiss: %s', transaction, adv, associationID, totalValue, totalCommiss);
    //TODO: improve your code here...
    res.status(200).send({
      transaction,
      adv,
      associationID,
      totalValue,
      totalCommiss
    });
  };

  const getOffersByStore = async (req, res) => {
    const { storeId } = req.params;
    const { createDeepLink = false, sourceId, appToken } = req.query;
    try {
      if (!sourceId || !appToken) {
        console.log(sourceId)
        return res.sendStatus(400);
      }
      const params = {
        storeId,
        appToken,
        createDeepLink,
        query: {
          sourceId
        }
      };
      const incommingMessage = await lomadeeServices.findDeepLinkOffers(params);
      if (incommingMessage.error) {
        console.log(incommingMessage.error)
        return res.sendStatus(500);
      }
      res.status(200).send(incommingMessage.data);
    } catch (err) {
      console.log('SADSADSADDASDAS %o', err);
      res.sendStatus(500);
    }

  };

  return {
    getPostBack,
    getOffersByStore
  };
})();

module.exports = lomadeeController;
