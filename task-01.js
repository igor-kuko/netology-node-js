#!/usr/bin/env node

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv))
  .option('year', {
    alias: 'y',
    type: 'number'
  })
  .option('month', {
    alias: 'm',
    type: 'number'
  })
  .option('date', {
    alias: 'd',
    type: 'number'
  })
  .argv;

const { _: [command] } = argv;

switch (command) {
  case 'current':
    console.log(getCurrentDate(argv));

    break;

  case 'add':
    console.log(setDate(argv, '+'));

    break;

  case 'sub':
    console.log(setDate(argv, '-'));

    break;
}

function getCurrentDate(argv) {
  const currentDate = new Date();

  if (argv.hasOwnProperty('year')) {
    return currentDate.getFullYear();
  }

  if (argv.hasOwnProperty('month')) {
    return currentDate.getMonth();
  }

  if (argv.hasOwnProperty('date')) {
    return currentDate.getDate();
  }

  return currentDate.toISOString();
}

function setDate({ year, month, date }, operation) {
  const currentDate = new Date();

  if (year) {
    currentDate.setFullYear(currentDate.getFullYear() + getNumWithOperation(year, operation))
  }

  if (month) {
    currentDate.setMonth(currentDate.getMonth() + getNumWithOperation(month, operation));
  }

  if (date) {
    currentDate.setDate(currentDate.getDate() + getNumWithOperation(date, operation));
  }

  return currentDate.toISOString();
}

function getNumWithOperation(num, operation) {
  return Number(`${operation}${num}`);
}
