const ip = require('ip');
const pkg = require('../../package.json');

const healthStatusController = (() => {
  const get = (req, res) => {
    const health = {
      datetime: new Date(),
      service: pkg.name,
      version: pkg.version,
      ip: ip.address(),
      container: process.env.HOSTNAME
    };

    return res.status(200).send(health);
  };

  return {
    get
  };
})();

module.exports = healthStatusController;
