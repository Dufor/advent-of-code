const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8').trim().split('\n');

const prepareArray = (arr) => {
  const sortedArray = arr.map(str => Number(str)).sort((a, b) => a - b);

  return [0, ...sortedArray];
}
const preparedArray = prepareArray(input);


const getFirstResult = (array) => {
  // формируем объект с ключами 1 и 3
  const jolt = array
    .map((num, i) => (i === (array.length - 1))
      ? 3
      : array[i+1] - num)
    .reduce((acc, cur) => ({
      ...acc,
      [cur]: acc[cur] ? acc[cur] + 1 : 1
    }), {})

  return jolt[1] * jolt[3]
}


const getSecondResult = (arr, memo = {}) => {
  // создаем ключ для мемоизированного объекта
  const key = arr.join(',');

  // если для текущего массива уже были выполнены вычисления, то возвращаем этот результат
  if (key in memo) {
    return memo[key];
  }

  let count = 1;

  for (let i = 1; i < arr.length; i++) {
    const isTargetDiff = (arr[i+1] - arr[i-1]) <= 3;

    // если разница между соседними значениями массива меньше 3,
    if (isTargetDiff) {
      // то формируем новый массив для проверки:
      // 1. которые начинается с предыдущего элемента
      // 2. без текущего элемента
      const arrayForCheck = [arr[i-1], ...arr.slice(i+1)];

      // получаем результат с учетом высчисления результата для нового массива
      count += getSecondResult(arrayForCheck, memo);
    }
  }

  // записываем в мемо результат для текущего значения массива
  memo[key] = count;

  return count;
};

console.log('part 1: ', getFirstResult(preparedArray));
console.log('part 2: ', getSecondResult(preparedArray));
