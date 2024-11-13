#!/usr/bin/env node

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const readline = require('readline');

const argv = yargs(hideBin(process.argv)).argv;
const defaultMin = 0;
const defaultMax = 100;

let { _: [min, max] } = argv;
min = min ?? defaultMin;
max = max ?? defaultMax;

const randomNum = getRandomInt(min, max);
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: `Загадано число в диапазоне от ${min} до ${max}\n`,
  }
);


rl.prompt();

rl.on('line', num => {
  if (Number(num) < randomNum) {
    console.log('Меньше');
  }

  if (Number(num) > randomNum) {
    console.log('Больше');
  }

  if (Number(num) === randomNum) {
    console.log(`Отгадано число ${num}`);
    rl.close();
  }
});


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
