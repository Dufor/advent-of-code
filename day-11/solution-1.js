const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8').trim().split('\n').map(el => el.split(''));


const getNextRoundSeat = (seatIndex, currentSeats, topSeats = [], bottomSeats = []) => {
  const currentSeat = currentSeats[seatIndex];

  if (currentSeat === '.') {
    return currentSeat;
  }

  const left = currentSeats[seatIndex - 1];
  const right = currentSeats[seatIndex + 1]

  const top = topSeats[seatIndex];
  const topLeft = topSeats[seatIndex - 1];
  const topRight = topSeats[seatIndex + 1]

  const bottom = bottomSeats[seatIndex];
  const bottomLeft = bottomSeats[seatIndex - 1];
  const bottomRight = bottomSeats[seatIndex + 1];

  const aroundSeats = [left, right, top, topLeft, topRight, bottom, bottomLeft, bottomRight]

  if (currentSeat === '#') {
    const occupiedSeatsAround = aroundSeats.filter(seat => seat === '#');

    return occupiedSeatsAround.length >= 4 ? 'L' : '#';
  }

  if (currentSeat === 'L') {
    const hasOccupied = aroundSeats.some(seat => seat === '#');

    return hasOccupied ? 'L' : '#';
  }

  // smth goes wrong
  return '*';
};

const getRound = (arr) => {
  return arr.map((seats, i, arr) => (
    seats.map((seat, j) => getNextRoundSeat(j, arr[i], arr[i-1], arr[i+1]))
  ));
};

const getIsEqual = (arrayA, arrayB) => arrayA.flat().toString() === arrayB.flat().toString();

const getFirstResult = (matrix) => {
  let prevMatrix = [...matrix];

  while (true) {
    const nextMatrix = getRound(prevMatrix);

    const isEqual = getIsEqual(prevMatrix, nextMatrix);

    if (isEqual) break;

    prevMatrix = nextMatrix;
  }

  return prevMatrix.flat().filter(el => el === '#').length;
};

console.log('calc2: ', getFirstResult(input));
