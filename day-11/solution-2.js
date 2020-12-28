const fs = require('fs');
const input = fs
  .readFileSync('input.txt', 'utf-8')
  .trim()
  .split('\n')
  .map(el => el.split(''));

const getAroundSeats = (i, j, arr) => {
  const aroundSeats = [];

  // идем влево
  for (let k = j - 1; k > -1; k--) {
    const seat = arr[i] && arr[i][k];
    if (!seat) break;
    if (/[#L]/.test(seat)) {
      aroundSeats.push(seat);
      break;
    }
  }

  // идем вправо
  for (let k = j + 1; k < arr[i]?.length; k++) {
    const seat = arr[i] && arr[i][k]
    if (!seat) break;
    if (/[#L]/.test(seat)) {
      aroundSeats.push(seat);
      break;
    }
  }

  // идем вверх
  for (let k = i - 1; k > -1; k--) {
    const seat = arr[k] && arr[k][j]
    if (!seat) break;
    if (/[#L]/.test(seat)) {
      aroundSeats.push(seat);
      break;
    }
  }

  // идем вниз
  for (let k = i + 1; k < arr[k]?.length; k++) {
    const seat = arr[k] && arr[k][j]
    if (!seat) break;
    if (/[#L]/.test(seat)) {
      aroundSeats.push(seat);
      break;
    }
  }

  // идем вправо вниз
  for (let k = i + 1, n = j + 1; k < arr[k]?.length || n < arr[n]?.length ; k++, n++) {
    const seat = arr[k] && arr[k][n]
    if (!seat) break;
    if (/[#L]/.test(seat)) {
      aroundSeats.push(seat);
      break;
    }
  }

  // идем влево вверх
  for (let k = i - 1, n = j - 1; k > -1 || n > -1 ; k--, n--) {
    const seat = arr[k] && arr[k][n]
    if (!seat) break;
    if (/[#L]/.test(seat)) {
      aroundSeats.push(seat);
      break;
    }
  }

  // идем влево вниз
  for (let k = i + 1, n = j - 1; k < arr[k]?.length || n > -1 ; k++, n--) {
    const seat = arr[k] && arr[k][n]
    if (!seat) break;
    if (/[#L]/.test(seat)) {
      aroundSeats.push(seat);
      break;
    }
  }

  // идем вправо вверх
  for (let k = i - 1, n = j + 1; k > -1 || n < arr[n]?.length ; k--, n++) {
    const seat = arr[k] && arr[k][n]
    if (!seat) break;
    if (/[#L]/.test(seat)) {
      aroundSeats.push(seat);
      break;
    }
  }

  return aroundSeats;
}

const getNextRoundSeat = (i, j, arr) => {
  const currentSeat = arr[i][j];

  if (currentSeat === '.') {
    return currentSeat;
  }

  const aroundSeats = getAroundSeats(i, j, arr);

  if (currentSeat === '#') {
    const occupiedSeatsAround = aroundSeats.filter(seat => seat === '#');

    return occupiedSeatsAround.length >= 5 ? 'L' : '#';
  }

  if (currentSeat === 'L') {
    const hasOccupied = aroundSeats.some(seat => seat === '#');

    return hasOccupied ? 'L' : '#';
  }

  // smth goes wrong
  return '*';
}

const getRound = (arr) => {
  return arr.map((seats, i, arr) => (
    seats.map((seat, j) => getNextRoundSeat(i, j, arr))
  ));
}

const getIsEqual = (arrayA, arrayB) => arrayA.flat().toString() === arrayB.flat().toString();


const getSecondResult = (matrix) => {
  let prevMatrix = [...matrix];

  while (true) {
    const nextMatrix = getRound(prevMatrix);

    const isEqual = getIsEqual(prevMatrix, nextMatrix)
    if (isEqual) break;

    prevMatrix = nextMatrix;
  }

  return prevMatrix.flat().filter(el => el === '#').length;
}

console.log('result: ', getSecondResult(input));
