const Discord = require("Discord.js");
const fs = require('fs');
let client = new Discord.Client();

var config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
var shortcuts = JSON.parse(fs.readFileSync('./shortcuts.json', 'utf8'));

client.login(config["token"]);

client.on('message', message =>
{
  if (message.author !== client.user) return;

  let shortcutPrefix = '/';
  if (message.content.indexOf(shortcutPrefix) != -1) ProcessShortcut(message);

  let emojifyPrefix = '<emoji>';
  if (message.content.indexOf(emojifyPrefix) != -1) Emojify(message);

  let lmgtfyPrefix = '|';
  if (message.content.startsWith(lmgtfyPrefix)) LMGTFYSearch(message);

  let purgePrefix = '*'
  if (message.content.startsWith(purgePrefix)) Purge(message)
});

//A way of sending some unique messages easily
//Usage : '/[Shortcut]'
//Example : '/lenny', ( ͡° ͜ʖ ͡°)
function ProcessShortcut(message)
{
  var text = message.content;

  for (var key in shortcuts)
  {
    text = text.replace(`/${key}`, shortcuts[key]);
  }
  setTimeout(() => {message.edit(text)}, 0);
  return message;
}

//Converts the text in your message to emojis
//Usage : '<[Message]'
//Example : '<I am obnoxious', https://cdn.discordapp.com/attachments/202157023184420865/315406499231039488/unknown.png
function Emojify(message)
{
  let text = message.content;

  while (text.indexOf('<emoji>') != -1)
  {
    emojiText = SubstringBetweenDelimiters(text, '<emoji>', '</emoji>');

    emojiText = StringToEmojis (emojiText.toLowerCase());

    text = text.replace(SubstringBetweenDelimiters(text, '<emoji>', '</emoji>'), emojiText);
    text = text.replace('<emoji>', '');
    text = text.replace('</emoji>', '');
  }

  setTimeout(() => {message.edit(text)}, 0);
  return message;
}

function StringToEmojis (str)
{
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  const specials = new Map
  ([
    ['?', 'question'],
    ['!', 'exclamation'],
    ['+', 'heavy_plus_sign'],
    ['-', 'heavy_minus_sign'],
    ['.', 'black_small_square']
  ])

  let emojiText = '';
  for (var i = 0; i < str.length; i++)
  {
    if (alphabet.indexOf(str.charAt(i)) != -1)
    {
      emojiText += `:regional_indicator_${str.charAt(i)}:`;
    }
    else if(specials.has(str.charAt(i)))
    {
      emojiText += `:${specials.get(str.charAt(i))}:`;
    }
    else
    {
      emojiText += str.charAt(i);
    }
  }

  return emojiText;
}

function SubstringBetweenDelimiters (str, startDelimiter, endDelimiter)
{
  var startPos = str.indexOf(startDelimiter) + startDelimiter.length;
  var endPos = str.indexOf(endDelimiter, startPos);
  return str.substring(startPos, endPos)
}

//Sends an lmgtfy link with your message
//Usage : '|[Search Query]'
//Example : '|HOW TO DO THINGS', http://www.lmgtfy.com/?q=HOW%20TO%20DO%20THINGS
function LMGTFYSearch (message)
{
  let search = message.content.slice(1);
  lmgtfyURL = `http://www.lmgtfy.com/?q=${encodeURI(search)}`;

  message.edit(lmgtfyURL);
  return message;
}

//Deletes your messages from your current channel.
//Usage : '*[Number of messages to delete]'
//Example : '*100', deletes your last 100 messages from the channel you are in
function Purge (message)
{
  count = parseInt(message.content.slice(1));

  message.channel.fetchMessages({
    'limit':100
  }).then(messages => {
    let msg_array = messages.array();
    msg_array = msg_array.filter(m => m.author.id === client.user.id);
    msg_array.length = count + 1;
    msg_array.map(m => m.delete().catch(console.error));
  })
}
