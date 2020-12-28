const fs = require('fs');
const input = fs
  .readFileSync('input.txt', 'utf-8')
  .trim()
  .split('\n')

const timestamp = Number(input[0]);
const busIds = input[1].split(',').filter(busId => busId !== 'x').map(Number);


const targetTimestamps = busIds.map(busId => timestamp - (timestamp % busId) + busId);

const firstTargetTimestamp = Math.min.apply(null, targetTimestamps);

const targetIndex = targetTimestamps.findIndex(target => target === firstTargetTimestamp);

const result = busIds[targetIndex] * (firstTargetTimestamp - timestamp);


console.log('result: ', result);
