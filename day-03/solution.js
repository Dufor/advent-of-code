const fs = require('fs');

const inputList = fs.readFileSync('input.txt', 'utf-8').trim().split('\n');

const getTreeCount = (arr, steps) => {
  const initial = {
    currentStep: [0, 0],
    count: 0,
  }

  const [stepRight, stepDown] = steps;

  const result = arr.reduce((acc, cur, i) => {
    const [right, down] = acc.currentStep;

    // если шаги вниз будут больше 1го, то проскакиваем строку
    if (down === i) {
      // вычисляем следующие шаги
      const nextRight = right + stepRight;
      const nextDown = down + stepDown;

      // определяем шаг вправо с учетом повторяющегося рисунка
      const processedNextRight = nextRight >= cur.length ? nextRight - cur.length : nextRight;

      acc.currentStep = [processedNextRight, nextDown];

      // чекаем дерево
      const isTree = cur[right] === '#';

      acc.count = isTree ? acc.count + 1 : acc.count;
    }

    return acc;
  }, initial)

  return result.count;
}

const firstTaskStep = [3, 1];
const secondTaskSteps = [[1,1], [3,1], [5,1], [7,1], [1,2]];

const firstTaskResult = getTreeCount(inputList, firstTaskStep);

const secondTaskResult = secondTaskSteps
  .map((step) => getTreeCount(inputList, step))
  .reduce((acc, cur) => acc * cur, 1);

console.log('firstTaskResult:  ', firstTaskResult);
console.log('secondTaskResult: ', secondTaskResult);
