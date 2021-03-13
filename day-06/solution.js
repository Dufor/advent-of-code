const fs = require('fs');
const groups = fs.readFileSync('input.txt', 'utf-8').trim().split('\n\n');

const allAnswers = groups.map(answers => answers.split('\n'));
const uniqueAnswers = allAnswers.map(answers => new Set(answers.join('')));


const getFirstResult = (arr) => arr.reduce((acc, cur) => acc + cur.size, 0);


const getAreAllAnswersHasSymbol = (arr, symbol) => arr.every(answer => answer.includes(symbol));

const getUniquesCounts = (answersList, uniquesList) => uniquesList
  .filter((unique) => getAreAllAnswersHasSymbol(answersList, unique))
  .length;

const getSecondResult = (arr, uniques) => {
  return arr
    .map((el, i) => getUniquesCounts(el, [...uniques[i]]))
    .reduce((acc, cur) => acc + cur, 0);
}


const firstResult = getFirstResult(uniqueAnswers);
const secondResult = getSecondResult(allAnswers, uniqueAnswers);

console.log('result1: ', firstResult);
console.log('result2: ', secondResult);
