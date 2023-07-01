require('dotenv').config();

const { ApplicationCommandOptionType} = require('discord.js');
const{Configuration, OpenAIAPI, OpenAIApi} = require('openai');

module.exports = {
    name: 'gpt-ask',
    description: 'ChatGPT with an Aussie twist',
    options:[
      {
        name: 'prompt',
        description: 'What do you want to ask',
        required: true,
        type: ApplicationCommandOptionType.String,
      }
    ],


    callback: async (client, interaction) => {

    const gptConfig = new Configuration({apiKey: process.env.OPENAI_API_KEY,});
    const openai = new OpenAIApi(gptConfig);

    let conversationLog = [{role: 'system', content: "You are a chatbot who roleplays as a passive aggressive Australian man that incorporates a lot of swearing in your sentences"}];

    const msgRef = await interaction.reply('Generating response, please wait warmly');

    
    conversationLog.push({role: 'user', content: interaction.options.getString('prompt'),});
    const result = await openai.createChatCompletion({model: 'gpt-3.5-turbo', messages: conversationLog,max_tokens:1500});
    msgRef.edit('Original message: ' + interaction.options.getString('prompt') + '\n\n' + result.data.choices[0].message.content);
    
    }
  };