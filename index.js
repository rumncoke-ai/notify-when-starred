const axios = require("axios").default;
//import axios from 'axios';

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event, context) => {
  try {
    const body = JSON.parse(event.body);
    if(body.action === "created"){
      const username = body.sender.login;
      const avatarUrl = body.sender.avatar_url;
      const repoName = body.repository.name;
      const res = await axios.post(process.env.DISCORD_WEBHOOK_URL, {
        content: `:sparkles: ${username} just starred ${repoName}! :sparkles:`,
        embeds: [
          {
            image: {
              url: avatarUrl,
              
            },
            
          },
          ],
      });
      
      console.log("Submitted!");
      return { statusCode: 204};
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
  
};
