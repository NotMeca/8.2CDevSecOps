const assert = require('assert');
const utils = require('./utils');

for (let i = 0; i < 100; i++) {
    const result = utils.ran_no(1, 10);

    assert(result >= 1, 'Result should not be less than 1');
    assert(result <= 10, 'Result should not be greater than 10');
}

console.log('All tests passed successfully.');
