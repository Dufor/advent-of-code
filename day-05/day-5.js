const fs = require('fs');

const input = fs.readFileSync('day-5.txt', 'utf-8').split('\n')

const getSeatRow = (path) => {
  const maxCount = Math.pow(2, path.length) - 1;
  let seatsRange = [0, maxCount];

  for (let i = 0; i < path.length; i++) {
    const isFirstHalf = /[LF]/i.test(path[i]);
    const nextRangeNumber = isFirstHalf
      ? Math.floor((seatsRange[1] - seatsRange[0])/2) + seatsRange[0]
      : Math.ceil((seatsRange[1] - seatsRange[0])/2) + seatsRange[0]

    seatsRange = [
      isFirstHalf ? seatsRange[0] : nextRangeNumber,
      isFirstHalf ? nextRangeNumber : seatsRange[1],
    ]
  }

  if (seatsRange[0] !== seatsRange[1]) {
    throw new Error('Error occured');
  }

  return seatsRange[0];
};

const calculateSeatId = (column, row) => column * 8 + row;

const getSeatId = (path) => {
  const column = getSeatRow(path.slice(0, 7))
  const row = getSeatRow(path.slice(7))
  return calculateSeatId(column, row)
};

const seatsIds = input.map(getSeatId);
const firstResult = Math.max.apply(null, seatsIds);


const secondResult = seatsIds
  .sort((a, b) => a - b)
  .reduce((acc, seatId, i, arr) => (
    i !== 0 && i !== arr.length-1 && (seatId+1 !== arr[i +1])
    ? seatId + 1
      : acc
  ), 0);


console.log('firstResult: ', firstResult);
console.log('secondResult: ', secondResult);
