module.exports = {
    name: 'ping',
    description: 'Pong!',


    callback: (client, interaction) => {
        interaction.reply('Pong!');
    }
}