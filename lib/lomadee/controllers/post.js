const lomadeeServices = require('../services');

const lomadeeController = (() => {
  const postDeepLink = async (req, res) => {
    const { sourceId, appToken, url, mdasc } = req.body;
    // http://sandbox-api.lomadee.com/v2/161712174182203d0fd36/deeplink/_create?sourceId=37061880&url=http://www.americanas.com.br&mdasc=xablau
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
