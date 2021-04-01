const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  mongoUri: process.env.MONGODB_URI,
  port: process.env.PORT,
  serviceUrl: process.env.SERVICE_URL,
  lomadee: {
    sourceId: process.env.LOMADEE_SOURCEID,
    appToken: process.env.LOMADEE_APPTOKEN,
    url: process.env.LOMADEE_URL
  }
};
