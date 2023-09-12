'use strict';

const line = require('@line/bot-sdk');
const express = require('express');
const axios = require('axios');

// create LINE SDK config from env variables
const config = {
  channelAccessToken: "eTsk7fXJKj4Eiyl1VFzCzl3teWfYTQZB2RyR483fCLMLOPBy3OfoMFaDh3ZIKEsrO6lpxkA6rs0ZPeVG1oSBBo9V8xbo41oELtbQ4gl5NRttDVxSVefGa95l/9xCDSMlK6pd4TV/0WfvWNekZf6+9wdB04t89/1O/w1cDnyilFU=",
  channelSecret: "d25ae9446d5f991037e7829dae94fdf5",
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// event handler
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  } else if (event.message.type==='text' && (event.message.text === 'Hello' || event.message.text === 'hello')){
    const payload ={
      type: "text",
      text: "Hello! Please Type The Desired Command                                            Click This Link To View How To Type Command: https://sv1.picz.in.th/images/2023/09/12/dW6feL9.png"

    };

  return client.replyMessage(event.replyToken, payload);

}else if (event.message.type === 'text' && (event.message.text === 'Lock' || event.message.text === 'lock')){
    const payload ={
      type: "text",
      text: "OK! Already Lock"

    };
  axios.get('https://sgp1.blynk.cloud/external/api/update?token=5-x1HiDMdSif4WwR6jFWe_eIhstFs13_&V9=1');
  return client.replyMessage(event.replyToken, payload);

  }else if (event.message.type === 'text' && (event.message.text === 'Unlock' || event.message.text === 'unlock')){
      const payload ={
        type: "text",
        text: "OK! Already Unlock"

      };
    axios.get('https://sgp1.blynk.cloud/external/api/update?token=5-x1HiDMdSif4WwR6jFWe_eIhstFs13_&V9=0');
    return client.replyMessage(event.replyToken, payload);

  }else if (event.message.type === 'text' && (event.message.text === 'Location' || event.message.text === 'location')){
      const payload ={
        type: "text",
        text: "OK! Location Click This https://sgp1.blynk.cloud/external/api/get?token=5-x1HiDMdSif4WwR6jFWe_eIhstFs13_&V12"

      };
    axios.get('https://sgp1.blynk.cloud/external/api/get?token=5-x1HiDMdSif4WwR6jFWe_eIhstFs13_&V12');
    return client.replyMessage(event.replyToken, payload);

  }else if (event.message.type === 'text' && (event.message.text === 'password' || event.message.text === 'Password')){
      const payload ={
        type: "text",
        text: "OK! Password Click This Link: https://sgp1.blynk.cloud/external/api/get?token=5-x1HiDMdSif4WwR6jFWe_eIhstFs13_&V10"

      };
    axios.get('https://sgp1.blynk.cloud/external/api/get?token=5-x1HiDMdSif4WwR6jFWe_eIhstFs13_&V10');
    return client.replyMessage(event.replyToken, payload);

  }else if (event.message.type === 'text' && (event.message.text === 'password 2' || event.message.text === 'Password 2' || event.message.text === 'password2' || event.message.text === 'Password2')){
      const payload ={
        type: "text",
        text: "OK! Password 2 Click This Link: https://sgp1.blynk.cloud/external/api/get?token=5-x1HiDMdSif4WwR6jFWe_eIhstFs13_&V11"

      };
    axios.get('https://sgp1.blynk.cloud/external/api/get?token=5-x1HiDMdSif4WwR6jFWe_eIhstFs13_&V11');
    return client.replyMessage(event.replyToken, payload);
    }

  // create a echoing text message
  //const echo = { type: 'text', text: event.message.text };

  // use reply API
  //return client.replyMessage(event.replyToken, echo);
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
