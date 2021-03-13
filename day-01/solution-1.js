const fs = require('fs');
const input = fs.readFileSync('day-1/input.txt', 'utf-8').trim().split('\n').map(Number);


const getFirstResult = (numbers, target = 2020) => {
    for (let i = 0; i < numbers.length; i++) {
        const numberToCurrentYear = target - numbers[i];

        const hasNumberToCurrentYear = numbers.slice(i+1).includes(numberToCurrentYear);

        if (hasNumberToCurrentYear) {
            return numberToCurrentYear * numbers[i];
        }
    }
};


const getSecondResult = (numbers) => {
    for (let i = 0; i < numbers.length; i++) {
        const numberToCurrentYearWithoutCurrentNumber = 2020 - numbers[i];
        const doubleNumbers = getFirstResult(numbers.slice(i + 1), numberToCurrentYearWithoutCurrentNumber);

        if (doubleNumbers) {
            return doubleNumbers * numbers[i];
        }
    }
};


console.log('result1: ', getFirstResult(input));
console.log('result2: ', getSecondResult(input));

