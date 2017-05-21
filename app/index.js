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
  if (message.content.startsWith(shortcutPrefix)) ProcessShortcut(message);

  let emojifyPrefix = '{';
  if (message.content.startsWith(emojifyPrefix)) Emojify(message);

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
  let shortcut = message.content.slice(1);
  setTimeout(() => {message.edit(shortcuts[shortcut])}, 0);
  return;
}

//Converts the text in your message to emojis
//Usage : '<[Message]'
//Example : '<I am obnoxious', https://cdn.discordapp.com/attachments/202157023184420865/315406499231039488/unknown.png
function Emojify(message)
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

  let text = message.content.slice(1).toLowerCase();

  var newMessage = '';

  for (var i = 0; i < text.length; i++)
  {
    if (alphabet.indexOf(text.charAt(i)) != -1)
    {
      newMessage += `:regional_indicator_${text.charAt(i)}:`;
    }
    else if(specials.has(text.charAt(i)))
    {
      newMessage += `:${specials.get(text.charAt(i))}:`;
    }
    else
    {
      newMessage += text.charAt(i);
    }
  }

  message.edit(newMessage);
}

//Sends an lmgtfy link with your message
//Usage : '|[Search Query]'
//Example : '|HOW TO DO THINGS', http://www.lmgtfy.com/?q=HOW%20TO%20DO%20THINGS
function LMGTFYSearch (message)
{
  let search = message.content.slice(1);
  lmgtfyURL = `http://www.lmgtfy.com/?q=${encodeURI(search)}`;

  message.edit(lmgtfyURL);
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
