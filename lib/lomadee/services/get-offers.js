const lomadeeClient = require('../../clients/lomadee');

const lomadeeGetServices = (() => {
  const createDeepLinkByOffers = async (context) => {
    if (!context || !context.offerResult.offers.length) {
      return context;
    }
    const buildQueryString = (offers, sourceId, mdasc) => offers.reduce((previousOffer, offer) => {
      if (!previousOffer.url) {
        previousOffer.url = [];
        previousOffer.url.push(offer.link);
        previousOffer.mdasc = mdasc;
        previousOffer.sourceId = sourceId;
      }
      // Sandbox can generate error if your app is not complete prepared (Must be validated by Lomadee)
      if (!previousOffer.url.find((item) => item.url === offer.url)) {
        previousOffer.url.push(offer.url);
      }
      return previousOffer;
    }, {});
    const params = {
      appToken: context.appToken,
      query: buildQueryString(context.offerResult.offers, context.sourceId, context.mdasc)
    };

    return lomadeeClient.createDeepLink(params);

  };
  const transformLinks = (offerResult, transformedOffers) => {
    const { deepLinks } = transformedOffers;
    offerResult.offers.map((offer) => {
      offer.link = deepLinks.find((link) => link.urlOrigin === offer.link).deepLink;
      return offer;
    });
    return offerResult;
  };
  const findDeepLinkOffers = async (params) => {
    const incommingMessage = await lomadeeClient.getOffersByStore(params);
    if (incommingMessage.statusCode !== 200) {
      return {
        error: {
          statusCode: incommingMessage.statusCode,
          message: incommingMessage.body,
          detail: `Error ${incommingMessage.statusCode} from getOfferByStore`
        }
      }
    }
    const context = {
      offerResult: incommingMessage.body,
      sourceId: params.sourceId,
      mdasc: params.mdasc,
      appToken: params.appToken,
      createDeepLink: params.createDeepLink
    }
    if (!context.createDeepLink) {
      return { data: incommingMessage.body };
    }
    const result = await createDeepLinkByOffers(context);
    if (!result.statusCode !== 200) {
      return {
        error: {
          statusCode: result.statusCode,
          message: result.body,
          detail: `Error ${result.statusCode} from createdeeplink`
        }
      }
    }
    return {
      data: transformLinks(context.offerResult, result.body.deepLinks)
    };
  };

  return {
    findDeepLinkOffers
  };
})();

module.exports = lomadeeGetServices;

