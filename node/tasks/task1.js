const express = require('express');
const bodyParser = require('body-parser');
const { WebhookClient } = require('dialogflow-fulfillment');
const PORT = 1234;
const app = express();
app.use(bodyParser.json());

app.post('/', (req, res) => {
    const agent = new WebhookClient({ request: req, response: res });

    const welcome = agent => {
        agent.add('Welcome to Drone\'s Cream. We supply the world with the best possible ice cream, anywhere, anytime.');
    };

    const fallback = agent => {
        agent.add('I\'m sorry. Your request was not recognized. Please try again.');
    };

    let intentMap = new Map();
    intentMap.set('welcome', welcome);
    intentMap.set(null, fallback);

    agent.handleRequest(intentMap)
});

app.listen(PORT, () =>
    console.log(
        `Node application is listening on port ${PORT} and ready for request!`
    ),
);
