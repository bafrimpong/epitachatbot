//a constant to get the dialogflow client access token api
const API_AI_TOKEN = '2b7522d303514c5da109c0750a3e7aa9';
const apiAiClient = require('apiai')(API_AI_TOKEN);

//a constant to get the facebook access token
const FACEBOOK_ACCESS_TOKEN = 'EAAE0Er7jQFwBAGO8SjyHBYLXPOJMYdye6JF8tcCkY904TnkSqARua3DrQuwr3yO1oDtI9OOgwrRjU1XkSBoBO1fB7vgg11nPuP9ab21R3ONcivE5EZBr1R0hgVXVfhyNiwrV7DvZCxQxZAiFIyh3u6CVKsllj2ttZAOZAi7Un7AZDZD';
const request = require('request');

const sendTextMessage = (senderId, text) => {
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: FACEBOOK_ACCESS_TOKEN },
        method: 'POST',
        json: {
            recipient: { id: senderId },
            message: { text },
        }
    });
};

module.exports = (event) => {
    const senderId = event.sender.id;
    const message = event.message.text;

    const apiaiSession = apiAiClient.textRequest(message, { sessionId: 'bismarkbotics_bot' });

    apiaiSession.on('response', (response) => {
        const result = response.result.fulfillment.speech;

        sendTextMessage(senderId, result);
    });

    apiaiSession.on('error', error => console.log(error));
    apiaiSession.end();
};