const { prefix } = require('../../config.json');

module.exports = {
    name: 'help',
    args: 0,
    execute(message) {
        new (require('../help/Help'))(prefix, message);
    },
};