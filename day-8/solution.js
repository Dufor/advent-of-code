const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf-8').split('\n');

const inputData = [];

for (let i = 0; i < input.length; i++) {
  const [key, value] = input[i].split(' ');
  if (key) {
    inputData.push({ key, value })
  }
}


const getFirstResult = (array) => {
  let result;
  const arr = [...array].map(el => ({...el}));

  for (let i = 0, currentIndex = 0, count = 0; i < arr.length; i++) {
    const currentObj = arr[currentIndex]
    let { key, value, isCycle } = currentObj;

    if (isCycle) {
      result = count;
      break;
    }

    currentObj.isCycle = true;

    if (key === 'nop') {
      currentIndex = currentIndex + 1;
    }

    if (key === 'jmp') {
      currentIndex = currentIndex + Number(value);
    }

    if (key === 'acc') {
      currentIndex = currentIndex + 1;
      count = count + Number(value);
    }
  }

  return result;
}

const getSecondResult = (array) => {
  for (let j = 0; j < array.length; j++) {
    const currentOuterObj = array[j];
    const {key: outerKey} = currentOuterObj;

    if (outerKey !== 'jmp' && outerKey !== 'nop') {
      continue;
    }

    const copiedArray = [...array].map(el => ({...el}));

    copiedArray[j] = currentOuterObj.key === 'jmp'
      ? {...currentOuterObj, key: 'nop'}
      : {...currentOuterObj, key: 'jmp'};

    for (let i = 0, currentIndex = 0, count = 0; i < copiedArray.length; i++) {
      const currentObj = copiedArray[currentIndex];
      if (!currentObj) break;

      let {key, value, isCycle} = currentObj;

      if (isCycle) {
        break;
      }

      currentObj.isCycle = true;

      if (key === 'nop') {
        currentIndex = currentIndex + 1;
      }

      if (key === 'jmp') {
        currentIndex = currentIndex + Number(value);
      }

      if (key === 'acc') {
        currentIndex = currentIndex + 1;
        count = count + Number(value);
      }

      const isLastObj = currentObj === copiedArray[copiedArray.length - 1];

      if (isLastObj) {
        return count;
      }
    }
  }
}


console.log('result: ', getFirstResult(inputData));
console.log('result: ', getSecondResult(inputData));
