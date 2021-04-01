const request = require('request');
const pkg = require('../../package.json');
const conf = require('../conf');

module.exports = (options) => new Promise((resolve, reject) => {
  options.headers = { ...options.headers, referer: `http://${pkg.name}:${conf.port}` };
  request(options, (err, httpResponse, body) => {
    if (err) {
      reject(err);
      return;
    }
    resolve({
      httpResponse,
      body
    });
  });
});
