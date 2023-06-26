require('dotenv').config();

const { ApplicationCommandOptionType} = require('discord.js');
const{Configuration, OpenAIAPI, OpenAIApi} = require('openai');

module.exports = {
    name: 'dall-e',
    description: 'Image generation',
    options:[
      {
        name: 'prompt',
        description: 'What do you want to see',
        required: true,
        type: ApplicationCommandOptionType.String,
      }
    ],
    //deleted: true,

    callback: async (client, interaction) => {

    const gptConfig = new Configuration({apiKey: process.env.OPENAI_API_KEY,});
    const openai = new OpenAIApi(gptConfig);

    
   
    try
    {
    if(interaction.user.id == '392163894585720833')
    {
        interaction.reply('Sorry you\'ve been blacklisted from using this command');
    }
    else
    {
    const msgRef = await interaction.reply('Generating image, please wait warmly');

    const result = await openai.createImage({
        prompt: interaction.options.getString('prompt'),
        n: 1,
        size: "512x512"
    });

    
    msgRef.edit(result.data.data[0].url);
    }
    } 
    catch(error)
    {
        console.error(error);
    }

    },
  };