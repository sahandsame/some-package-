/*
  Please refer to the LICENSE file for more info.
  Copyright (c) JackMcCally 2017
*/

const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('./config.json');

var log = function(lvl,msg) {
  console.log('[' + lvl + '] ' + msg);
}

bot.on('ready', () => {
  log('INFO', 'Rollr has been initalized!')
});

bot.on('message', msg => {
  if(!msg.content.startsWith(config.prefix)) return;
  
  const args = msg.content.split(" ");
  const command = args.shift().slice(config.prefix.length);
  
  try {
    let cmdFile = require("./commands/" + command);
    cmdFile.run(args,msg,bot);
  } catch(e) {
    log('CMD', e)
  }
});

bot.on('error', console.error);
bot.on('warn', console.warn);
bot.on('disconnect', console.warn);

process.on('uncaughtException', (err) => {
  let errorMsg = err.stack.replace(new RegExp(`${__dirname}\/`, 'g'), './');
  log("error", "Uncaught Exception", bot.user, errorMsg);
});

process.on("unhandledRejection", err => {
  console.error("Uncaught Promise Error", bot.user, err);
});

bot.login(config.token);