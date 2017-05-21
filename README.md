# SelfBot


This is a selfbot made by me to add a few nice features that I wanted in discord.

## How to set up this SelfBot:

**To use this selfbot you need to install the latest versions of both Node.js, Discord.js *and* PM2**

Node.js can be found at:
https://nodejs.org/

After installing that, run the '*init.bat*' file in the '*app*' folder, follow the instructions it gives you. Input the name then press enter for everything until the end when you have to say: "Yes".

**You also need to add a file named '*config.json*' in the '*app*' folder. In this file you need to put:**

`{"token" : "YOURDISCORDUSERTOKEN"}`

Replacing with your Discord user token.

To find out your discord user token, open discord and press Ctrl+Shift+I. Navigate to the '*Application*' section, then on the left select '*local storage*' then '*https://discordapp.com*'. Scroll down to the last element on the right which is the token. Copy this and paste it into the config file.

#### DO NOT I repeat, **DO NOT** tell **ANYONE** this token. This will give them total access to your account, which, unsurprisingly, is very bad. So don't tell anyone. No one. Nobody. Not a soul. You get the picture.


Once you have set all this up, simply run the '*run.bat*' file in the '*app*' folder to run the bot.

If for some reason you want to stop the bot, run the '*kill.bat*' file in the same location.

## Commands

This is a handy guide to everything this bot can do:

**Shortcuts**: I added a few of my favourite things to send in chat so that they can be sent easily without much unnecessary copy-pasting the usage for this is: `/[shortcut name]`, for example `/lenny`

The shortcuts are:
  `lenny`,
  `hidinglenny`,
  `shrug`,
  `justright`,
  `tableflip`,
  `unflip`,
  `disapproval`,
  `facepalm` and
  `facedesk`

The shortcuts are all stored in the file '*shortcuts.json*', to add extra shortcuts, you need to edit this file. Every command needs to be on a new line (The previous one being terminated with a comma). The syntax is like this:

`"[shortcut name]" : "[shortcut text]"`


**Emojification**: Have you ever had a point so strong normal letters couldn't get it across? Now you can make it better... with Emojis! This command converts letters into letter Emojis. The way to use this command is `{[Message]`, for example `{hello`.

**LMGTFY**: Ah yes, everyone's favourite way to humiliate a stupid question. If you don't know what LMGTFY is then click this link: http://lmgtfy.com/?q=What+is+LMGTFY%3F. To use this command, type in `|[Search Query]`. For example, you could do `|How to do things`

**Purging Messages**: This command is simple, it deletes past messages from the channel you are in. To use it, type in `*[Number of Messages to Delete]`, like `*10`
