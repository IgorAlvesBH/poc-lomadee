const lomadeeServices = require('../services');

const lomadeeController = (() => {
  const postDeepLink = async (req, res) => {
    const { sourceId, appToken, url, mdasc } = req.body;
    const params = {
      appToken,
      query: {
        sourceId, url, mdasc
      }
    };
    const incommingMessage = await lomadeeServices.createDeepLink(params);
    if (incommingMessage.error) {
      console.log(incommingMessage.error.detail);
      return res.sendStatus(500);
    }
    res.status(200).send(incommingMessage.data);
  };

  return {
    postDeepLink
  };
})();

module.exports = lomadeeController;
xz
