const path = require('path');
const getAllfiles = require('./getAllFiles');
const { get } = require('http');

module.exports = (exceptions) =>
{
    let localCommands = [];

    const commandCategories = getAllfiles(path.join(__dirname,'..', 'commands'), true);

    for(const commandCategory of commandCategories)
    {
        const commandFiles = getAllfiles(commandCategories);

        console.log(commandFiles);        
    }




    return localCommands;
}