/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';
const Alexa = require('alexa-sdk');

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1';
const APP_ID = undefined;

const SKILL_NAME = 'Im starting my day';
const GET_FACT_MESSAGE = "Today is going to be a great day. Here is a quote to start you off: ";
const HELP_MESSAGE = 'You can say Im starting my day, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'Are you ready to start your day?';
const STOP_MESSAGE = 'Goodbye! Have a great day.';

//=========================================================================================================================================
//TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/data
//=========================================================================================================================================
const data = [
    'Do just once what others say you cant do, and you will never pay attention to their limitations again. James R. Cook',
    'Forget past mistakes. Forget failures. Forget about everything except what youre going to do now - and do it. William Durant',
    'It has been my philosophy of life that difficulties vanish when faced boldly. Isaac Asimov',
    'What would you attempt to do if you knew you could not fail? Robert Schuller',
    'Start by doing whats necessary; then do whats possible; and suddenly you are doing the impossible. St. Francis of Assisi',
    '"Twenty years from now you will be more disappointed by the things you didnt do, than by the ones you did. So throw off the bowlines. Sail away from the safe harbor. Catch the trade winds in your sails. Explore, Dream, Discover. Mark Twain',
    'Many of lifes failures are experienced by people who did not realize how close they were to success when they gave up." Thomas Edison',
    'Even if youre on the right track, youll get run over if you just sit there. Will Rogers',
    'When one door closes, another opens. But we often look so regretfully upon the closed door that we dont see the one that has opened for us. Alexander Graham Bell'
];

//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================

const handlers = {
    'LaunchRequest': function () {
        this.emit('GetNewFactIntent');
    },
    'GetNewFactIntent': function () {
        const factArr = data;
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];
        const speechOutput = GET_FACT_MESSAGE + randomFact;

        this.response.cardRenderer(SKILL_NAME, randomFact);
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
