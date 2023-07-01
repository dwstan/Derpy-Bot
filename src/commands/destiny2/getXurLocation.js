require('dotenv').config();
const axios = require('axios');
const qs = require('qs');

const { ApplicationCommandOptionType} = require('discord.js');

module.exports = {
    name: 'where-xur',
    description: 'Gets Xur\'s location for the week',

    callback: async (client, interaction) => {

        const msgRef = await interaction.reply('Fetching Xur\'s location');

        function getRefreshToken(){
            const refreshData = {
              client_id: process.env.BUNGIE_OAUTH_CLIENT_ID,
              grant_type: "refresh_token",
              refresh_token: process.env.BUNGIE_OAUTH_REFRESH,
              client_secret: process.env.BUNGIE_OAUTH_CLIENT_SECRET,
            };
              return axios.post('https://www.bungie.net/Platform/App/OAuth/Token/', qs.stringify(refreshData))
              .catch(error => {
                console.log(error);
            });     
            }
      
            function getXurLocation(){
      
              const xurData = {
                headers:{
                'x-api-key': process.env.BUNGIE_API_KEY, 
                'Authorization': 'Bearer ' + new_auth_token, 
                }
              };
              return axios.get('https://www.bungie.net/Platform/Destiny2/3/Profile/' + process.env.DESTINY2_PROFILE + '/Character/' + process.env.DESTINY2_CHARACTER + '/Vendors/2190858386/?components=400,402', xurData)
              .catch(error => {
                console.log(error);
            });
          };
      
            let tokenRes = await getRefreshToken();
            let new_auth_token = tokenRes.data.access_token;
            
            let xurRes = await getXurLocation();
            let xurLoc = xurRes.data.Response.vendor.data.vendorLocationIndex;
      

            switch(xurLoc)
            {
            case 0:
                msgRef.edit("Xur is at the Tower (Hangar)");
                break;
            case 1:     
                msgRef.edit("Xur is at the EDZ (Winding Cove)");
                break;
            case 2:                  
                msgRef.edit("Xur is at Nessus (Watcher's Grave)");
                break;
            default: 
                msgRef.edit("Unable to find Xur\'s location");
            }
    },
};