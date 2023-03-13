const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const formatMessage = require('format-message');

const ExtLanguages = require('scratch-translate-extension-languages');

/**
 * Url of icon to be displayed at the left edge of each extension block.
 * @type {string}
 */
// const iconURI = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjRkZGRkZGIj48cGF0aCBkPSJNMTIgMTRjMS42NiAwIDIuOTktMS4zNCAyLjk5LTNMMTUgNWMwLTEuNjYtMS4zNC0zLTMtM1M5IDMuMzQgOSA1djZjMCAxLjY2IDEuMzQgMyAzIDN6bTUuMy0zYzAgMy0yLjU0IDUuMS01LjMgNS4xUzYuNyAxNCA2LjcgMTFINWMwIDMuNDEgMi43MiA2LjIzIDYgNi43MlYyMWgydi0zLjI4YzMuMjgtLjQ4IDYtMy4zIDYtNi43MmgtMS43eiIvPjxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz48L3N2Zz4K';
const iconURI = 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI2Mi4xODY4NyIgaGVpZ2h0PSI0Ni42NjgzMSIgdmlld0JveD0iMCwwLDYyLjE4Njg3LDQ2LjY2ODMxIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTgxLjM1MTA3LC00Ni41NzUzMikiPjxnIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2lzUGFpbnRpbmdMYXllciZxdW90Ozp0cnVlfSIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0xOTkuNjgxOSw4NS4yMTA1NWM0LjA0ODQ5LDEuNDM0NTQgOC42NTA5OCwyLjI0NTQ3IDEzLjUzMiwyLjI0NTQ3YzE2LjE5NTIyLDAgMjkuMzI0MDQsLTguOTI3NiAyOS4zMjQwNCwtMTkuOTQwMzVjMCwtMTEuMDEyNzUgLTEzLjEyODgyLC0xOS45NDAzNSAtMjkuMzI0MDQsLTE5Ljk0MDM1Yy0xNi4xOTUyMiwwIC0yOS4zMjQwNCw4LjkyNzYgLTI5LjMyNDA0LDE5Ljk0MDM1YzAsNC45NTczMiAyLjY2MDI4LDkuNDkyMTIgNy4wNjMwMywxMi45ODAzbC03LjA2MzAzLDEwLjcxMzUyeiIvPjwvZz48L2c+PC9zdmc+';

/**
 * Url of icon to be displayed in the toolbox menu for the extension category.
 * @type {string}
 */
// const menuIconURI = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNHB4IiBoZWlnaHQ9IjI0cHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzc1NzU3NSI+CiAgICA8cGF0aCBkPSJNMTIgMTRjMS42NiAwIDIuOTktMS4zNCAyLjk5LTNMMTUgNWMwLTEuNjYtMS4zNC0zLTMtM1M5IDMuMzQgOSA1djZjMCAxLjY2IDEuMzQgMyAzIDN6bTUuMy0zYzAgMy0yLjU0IDUuMS01LjMgNS4xUzYuNyAxNCA2LjcgMTFINWMwIDMuNDEgMi43MiA2LjIzIDYgNi43MlYyMWgydi0zLjI4YzMuMjgtLjQ4IDYtMy4zIDYtNi43MmgtMS43eiIvPgogICAgPHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPgo8L3N2Zz4K';
const menuIconURI = 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI2Mi4xODY4NyIgaGVpZ2h0PSI0Ni42NjgzMSIgdmlld0JveD0iMCwwLDYyLjE4Njg3LDQ2LjY2ODMxIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTgxLjM1MTA3LC00Ni41NzUzMikiPjxnIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2lzUGFpbnRpbmdMYXllciZxdW90Ozp0cnVlfSIgZmlsbD0iIzAwOGJmNyIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0xOTkuNjgxOSw4NS4yMTA1NWM0LjA0ODQ5LDEuNDM0NTQgOC42NTA5OCwyLjI0NTQ3IDEzLjUzMiwyLjI0NTQ3YzE2LjE5NTIyLDAgMjkuMzI0MDQsLTguOTI3NiAyOS4zMjQwNCwtMTkuOTQwMzVjMCwtMTEuMDEyNzUgLTEzLjEyODgyLC0xOS45NDAzNSAtMjkuMzI0MDQsLTE5Ljk0MDM1Yy0xNi4xOTUyMiwwIC0yOS4zMjQwNCw4LjkyNzYgLTI5LjMyNDA0LDE5Ljk0MDM1YzAsNC45NTczMiAyLjY2MDI4LDkuNDkyMTIgNy4wNjMwMywxMi45ODAzbC03LjA2MzAzLDEwLjcxMzUyeiIvPjwvZz48L2c+PC9zdmc+';

/**
 * KEY to be used in OPENAI API calls, need to be replaced by .ENV file in production.
 * @type {string}
 */
const OPENAI_API_KEY='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';

// console.log("index.js...");
/**
 * Class for the ChatBot blocks.
 * @constructor
 */
class Scratch3ChatBlocks {

    constructor (runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {runtime}
         */
        this._runtime = runtime;    
        this._chatOutput = '';
        this._isReplyCompleted = false;
        this.DEFAULT_TALK = 'Hello!';
        // console.log("constructor: "+this._chatOutput);
    }

    /**
     * @returns {object} Metadata for this extension and its blocks.
     */
    getInfo () {
        return {
            id: 'chatBot',
            name: formatMessage({
                id: 'chatBot.extensionname',
                default: 'Chat with GPT',
                description: 'Name of extension that adds chat blocks.'
            }),
            menuIconURI: menuIconURI,
            blockIconURI: iconURI,
            blocks: [
                {
                    opcode: 'sendMyTalk',
                    text: formatMessage({
                        id: 'chatBot.sendMyTalk',
                        default: 'send in [TALK]',
                        // eslint-disable-next-line max-len
                        description: 'Send in my talk to ChatGPT system.'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        TALK: {
                            type: ArgumentType.STRING,
                            defaultValue: this.DEFAULT_TALK
                        }
                    }
                },
                {
                    opcode: 'getReply',
                    text: formatMessage({
                        id: 'chatBot.getReply',
                        default: 'reply',
                        description: 'Show reply to your talk.'
                    }),
                    blockType: BlockType.REPORTER,
                },
                {
                    opcode: 'replyCompleted',
                    text: formatMessage({
                        id: 'chatBot.replyCompleted',
                        default: 'reply completed',
                        description: 'True when reply is completed.'
                    }),
                    blockType: BlockType.BOOLEAN,
                },
                {
                    opcode: 'clearReply',
                    text: formatMessage({
                        id: 'speech.clearReplyCmd',
                        default: 'clear reply',
                        description: 'clear last reply from Chat Bot.'
                    }),
                    blockType: BlockType.COMMAND
                }
            ],
            menus: {
                // languages: {
                //     acceptReporters: true,
                //     items: this._getLanguageMenu()
                // }
            }
        }
    };


    /**
     * Start the listening process if it isn't already in progress.
     * @param  {object} args Block arguments
     * @return {Promise} A promise that will resolve when listening is complete.
     */
    sendMyTalk (args) {
        //console.log("sendMyTalk: "+this._chatOutput);
        const sPhrase = args.TALK;

        this.setReply('');
        this.setReplyCompletion(false);

        if (sPhrase == ''){
            this.setReply('Error: not talking to me yet!');
            //setResult("Error: Please talk to me!")
            return;
        }
         
        const oHttp = new XMLHttpRequest();
        // oHttp.open('POST', 'https://api.openai.com/v1/completions');
        oHttp.open('POST', 'https://api.openai.com/v1/chat/completions');
        oHttp.setRequestHeader('Accept', 'application/json');
        oHttp.setRequestHeader('Content-Type', 'application/json');
        oHttp.setRequestHeader('Authorization', 'Bearer ' + OPENAI_API_KEY)

        const sModel = 'gpt-3.5-turbo-0301';  // GPT3.5 chat model
        const iMaxTokens = 300;  //2048;  //4096 for gpt-3.5-turbo-0301
        const sUserId = '1';
        const dTemperature = 0.5;
    
        const data = {
            model: sModel,
            prompt: sPhrase,
            max_tokens: iMaxTokens,
            user: sUserId,
            temperature: dTemperature,
            frequency_penalty: 0.0, // Number between -2.0 and 2.0  Positive value decrease the model's likelihood to repeat the same line verbatim.
            presence_penalty: 0.0, // Number between -2.0 and 2.0. Positive values increase the model's likelihood to talk about new topics.
            stop: ['#', ';'] // Up to 4 sequences where the API will stop generating further tokens. The returned text will not contain the stop sequence.
        }
    
        oHttp.send(JSON.stringify(data));

        oHttp.onreadystatechange = async function () {
            // console.log("oHttp:" + oHttp.readyState);
            let output = '';
            if (oHttp.readyState === 4) {

                let oJson = {};
                // this._botIsThinking = false;
                try {
                    oJson = await JSON.parse(oHttp.responseText);

                    if (oJson.error && oJson.error.message) {
                        output = `Error: ${  oJson.error.message}`;
                    } else if (oJson.choices && oJson.choices[0].text) {
                        let s = oJson.choices[0].text;
                        let a = [];
    
                        if (this._currentLanguage != 'en-US') {
                            a = s.split('?\n');
                            if (a.length == 2) {
                                s = a[1];
                            }
                        }
    
                        if (s == '')
                            s = 'Error: No response';
                        output = s.trim();
                    }
                } catch (ex) {
                    output = 'Error: ' + ex.message;
                }
                Scratch3ChatBlocks.prototype.setReply(output);
                Scratch3ChatBlocks.prototype.setReplyCompletion(true);
            }
        };
    }
    

    /**
     * Inidcate whether the reply is completed or not.
     * @return {boolean} true if the reply from chat bot is completed.
     */
    replyCompleted () {
        //return true if the chat bot completed its reply;
        //console.log("replyCompleted: "+ Scratch3ChatBlocks.prototype._isReplyCompleted);
        return Scratch3ChatBlocks.prototype._isReplyCompleted;
    }
    /**
     * Set the the status of chat bot reply.
     * @param  {boolean} status Block arguments
     */
    setReplyCompletion (status) {
        this._isReplyCompleted = status;
        //console.log("setReplyCompletion: "+this._isReplyCompleted);
     }
 
    /**
     * Reporter for the reply from chat bot.
     * @return {string} The lastest reply from "sendMyTalk" block.
     */
    getReply () {
        //return reply from chat bot;
        //console.log("getReply: "+Scratch3ChatBlocks.prototype._chatOutput);
        return Scratch3ChatBlocks.prototype._chatOutput;
    }
    /**
     * Set the chat bot reply.
     * @param  {string} reply Block arguments
     */
    setReply (reply) {
       this._chatOutput = reply;
       //console.log("setReply: "+this._chatOutput);
    }
    /**
     * Set the chat bot reply.
     * @param  {string} reply Block arguments
     */
    clearReply () {
        Scratch3ChatBlocks.prototype._chatOutput = '';
        //console.log("clearReply: "+cratch3ChatBlocks.prototype._chatOutput);
     }
 }
module.exports = Scratch3ChatBlocks;