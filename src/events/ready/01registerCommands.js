const getLocalCommands = require('../../utils/getLocalCommands');

module.exports = (client) =>
{
    const localCommands = getLocalCommands();
    console.log(localCommands);
};