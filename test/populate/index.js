const { v1: uuid } = require('uuid');
const Chance = require('chance');

const chance = new Chance();

const populate = (() => {
  const example = () => {
    let mobile = chance.string({ length: 2, pool: '123456789' });
    mobile += '9';
    mobile += chance.string({ length: 8, pool: '0123456789' });

    const request = {
      code: uuid(),
      experience: chance.string({ length: 30 }),
      event: chance.string({ length: 30 }),
      mobile,
      value: chance.integer({ min: 1, max: 200 })
    };
    return request;
  };

  return {
    example
  };
})();

module.exports = populate;
