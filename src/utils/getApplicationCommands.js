module.exports = async (client) => {

    let applicationCommands;

    applicationCommands = await client.application.commands;


    await applicationCommands.fetch();
    return applicationCommands;
}