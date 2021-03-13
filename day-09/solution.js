const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8').trim().split('\n');

// [35, 20, 15, 25, 47] , 40 -> true
const hasSumInArray = (arr, number) => {
  for (let i = 0; i < arr.length; i++) {
    const iterNumber = arr[i];
    const uncheckedArrPart = arr.slice(i + 1)
    const hasSum = uncheckedArrPart.some(el => Number(el) + Number(iterNumber) === Number(number))

    if (hasSum) return true;
  }

  return false;
}

const getFirstResult = (arr, preamble = 25) => {
  for (let i = 0; i < arr.length; i++) {
    const iterableNumber = arr[Number(preamble) + i];
    const iterableArray = arr.slice(i, Number(preamble)+i);
    const hasSum = hasSumInArray(iterableArray, iterableNumber);

    if (!hasSum) return iterableNumber;
  }

  return -1;
}


const calculateFinalResult = (arr, from, to) => {
  const finalArray = arr.slice(from, to + 1)
  const max = Math.max.apply(null, finalArray);
  const min = Math.min.apply(null, finalArray);
  return max + min;
}

const getSecondResult = (arr) => {
  const incorrectNumber = Number(getFirstResult(arr, ));
  const incorrectIndex = arr.findIndex(el => Number(el) === incorrectNumber);

  for (let i = incorrectIndex - 1; i > 0; i--) {
    let targetNumber = incorrectNumber;
    let iter = i;
    while (targetNumber >= 0) {
      targetNumber = targetNumber - arr[iter];

      if (targetNumber === 0) {
        return calculateFinalResult(arr, iter, i)
      }

      iter--;
    }
  }

  return -1;
}

console.log('result1', getFirstResult(input));
console.log('result2', getSecondResult(input));
