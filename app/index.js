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

  let lmgtfyPrefix = '<lmgtfy>';
  if (message.content.indexOf(lmgtfyPrefix) != -1) LMGTFYSearch(message);

  let purgePrefix = '*'
  if (message.content.startsWith(purgePrefix)) Purge(message)
});

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

function Emojify(message)
{
  let text = message.content;

  text = ModifyTextBetweenTags(text, 'emoji', StringToEmojis);

  setTimeout(() => {message.edit(text)}, 0);
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
    ['.', 'black_small_square'],
    [' ', 'black_large_square']
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

function LMGTFYSearch (message)
{
  let text = message.content;

  text = ModifyTextBetweenTags(text, 'lmgtfy', StringToLMGTFYSearch);

  setTimeout(() => {message.edit(text)}, 0);
}

function  StringToLMGTFYSearch (str)
{
  return `http://www.lmgtfy.com/?q=${encodeURI(str)}`;
}

function ModifyTextBetweenTags (str, tagname, replaceFunction)
{
  while (str.indexOf(`<${tagname}>`) != -1)
  {
    let modifiedText = SubstringBetweenDelimiters(str, `<${tagname}>`, `</${tagname}>`);

    modifiedText = replaceFunction (modifiedText.toLowerCase());

    str = str.replace(SubstringBetweenDelimiters(str, `<${tagname}>`, `</${tagname}>`), modifiedText);
    str = str.replace(`<${tagname}>`, '');
    str = str.replace(`</${tagname}>`, '');
  }

  return str;
}

function SubstringBetweenDelimiters (str, startDelimiter, endDelimiter)
{
  var startPos = str.indexOf(startDelimiter) + startDelimiter.length;
  var endPos = str.indexOf(endDelimiter, startPos);
  return str.substring(startPos, endPos)
}

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
