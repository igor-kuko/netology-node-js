#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const [logFileName] = process.argv.splice(2);
const log = {
  gamesPlayed: 0,
  win: 0,
  lost: 0
};
const writeStream = fs.createWriteStream(path.join(__dirname, `${logFileName}.json`));
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'Привет! Я буду подбрасывать монетку, а ты попробуй угадать что выпало орел(1) или решка(2)?\n(для' +
    ' выхода нажми ^C)\n'
});

rl.prompt();

rl
  .on('line', answer => {
  const value = Math.floor(Math.random() * 2) + 1;

  log.gamesPlayed++;

  if (Number(answer) === value) {
    console.log('Верно');
    log.win++
  } else {
    console.log('Неверно')
    log.lost++;
  }
})
  .on('close', () => writeStream.write(JSON.stringify(log)));
