#!/usr/bin/env node

const fs = require('fs');

const [logFilePath] = process.argv.splice(2);
const readStream = fs.createReadStream(logFilePath);

let tmpData = '';

readStream
  .on('data', chunk => tmpData += chunk.toString())
  .on('end', () => {
    readLogs(JSON.parse(tmpData));
    readStream.destroy();
  })
  .on('error', error => {
    if (error.code === 'ENOENT') {
      console.error('Указанного файла не существует');
    } else {
      console.error(error);
    }
  });


function readLogs(data) {
  console.log(`Всего игр: ${data.gamesPlayed}`);
  console.log(`Выиграно: ${data.win}`);
  console.log(`Проиграно: ${data.lost}`);
  console.log(`Процент выигрыша: ${(100 / data.gamesPlayed * data.win).toFixed(1)}%`);
}
