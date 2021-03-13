const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf-8').trim().split('\n');

const formattedInput = input.map((el) => {
  const [range, char, password] = el.split(' ');

  const [rangeFrom, rangeTo] = range.split('-');

  return {
    rangeFrom,
    rangeTo,
    char: char[0],
    password,
  }
});

const getCharCountInPassword = (char, password) => {
  return [...password].reduce((acc, cur) => (
    cur === char
      ? acc + 1
      : acc
  ), 0);
};


const getIsFirstValid = ({char, rangeFrom, rangeTo, password}) => {
  const charCount = getCharCountInPassword(char, password);

  return rangeFrom <= charCount && charCount <= rangeTo;
};

const getIsSecondValid = ({char, rangeFrom, rangeTo, password}) => {
  const firstChar = password[rangeFrom-1];
  const secondChar = password[rangeTo-1];

  return (firstChar === char && secondChar !== char) || (firstChar !== char && secondChar === char);
};


const firstResult = formattedInput.filter(getIsFirstValid).length;
const secondResult = formattedInput.filter(getIsSecondValid).length;

console.log('part 1:', firstResult);
console.log('part 2:', secondResult);
