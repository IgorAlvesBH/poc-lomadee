const lomadeeClient = require('../../clients/lomadee');

const lomadeeGetServices = (() => {
  const createDeepLink = async (params) => {
    const incommingMessage = await lomadeeClient.createDeepLink(params)
    if (incommingMessage.statusCode !== 200) {
      return {
        error: {
          statusCode: incommingMessage.statusCode,
          message: incommingMessage.body,
          detail: `Error ${incommingMessage.statusCode} from getdeeplink`
        }
      }
    }
    return {
      data: incommingMessage.body
    };
  };

  return {
    createDeepLink
  };
})();

module.exports = lomadeeGetServices;

