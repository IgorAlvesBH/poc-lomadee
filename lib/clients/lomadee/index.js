const conf = require('../../conf');
const requestPromiseWrapper  = require('../../utils/request-promise-wrapper');

const lomadeeClient = (() => {
  const getOffersByStore = async (params) => {
    const { httpResponse, body } = await requestPromiseWrapper({
      url: `${conf.lomadee.url}/v3/${params.appToken}/offer/_store/${params.storeId}`,
      method: 'GET',
      forever: true,
      qs: params.query,
      json: true,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return {
      body,
      statusCode: httpResponse.statusCode
    }
  };
  const createDeepLink = async (params) => {
    const { httpResponse, body } = await requestPromiseWrapper({
      url: `${conf.lomadee.url}/v2/${params.appToken}/deeplink/_create`,
      method: 'GET',
      forever: true,
      qs: params.query,
      json: true,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return {
      body,
      statusCode: httpResponse.statusCode
    }
  };
  return {
    getOffersByStore,
    createDeepLink
  };
})();

module.exports = lomadeeClient;
