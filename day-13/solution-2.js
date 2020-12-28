const fs = require('fs');
const input = fs
  .readFileSync('input.txt', 'utf-8')
  .trim()
  .split('\n')

const buses = input[1].split(',').map((num, i) => ({
  id: Number(num),
  latency: i,
})).filter(el => !!el.id);


let lowestTimestamp = 0;
let minMultiple = 1;

for (let i = 0; i < buses.length; i++) {
  const { id, latency } = buses[i];

  while (true) {
    if ((lowestTimestamp + latency) % id === 0) {
      minMultiple *= id;
      break;
    } else {
      lowestTimestamp += minMultiple;
    }
  }
}

console.log(lowestTimestamp);
