require('dotenv').config();
const {Client, IntentsBitField} = require('discord.js');
const{Configuration, OpenAIAPI, OpenAIApi} = require('openai');
const eventHandler = require('./handlers/eventHandler');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});


const gptConfig = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(gptConfig);


//commands



eventHandler(client);

client.login(process.env.TOKEN);