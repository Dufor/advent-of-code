const fs = require('fs');
const passports = fs.readFileSync('day-4/input.txt', 'utf-8').split('\n\n');

const keys = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
const isIncludeKeys = (str) => keys.every((key) => str.includes(key));

const correctPassports = passports.filter(isIncludeKeys);


// нормализуем паспорта в объект
const newPassports = correctPassports.map((passport) => {
  const newPassport = passport
    .replace(/[\n ]/g, ', ')
    .split(', ')
    .map(x => x.split(':'))

  return Object.fromEntries(newPassport)
});

// список валидаторов
const keysValidators = {
  byr: (val) => val.length === 4 && val >= 1920 && val <= 2002,
  iyr: (val) => val.length === 4 && val >= 2010 && val <= 2020,
  eyr: (val) => val.length === 4 && val >= 2020 && val <= 2030,
  hgt: (val) => {
    const isCm = val.includes('cm');
    const isIn = val.includes('in');

    // если попались оба варианта или оба варианта отсутствуют - то валидация не пройдена
    if ((isCm && isIn) || (!isCm && !isIn)) return false;

    const numberValue = parseInt(val, 10);

    return isCm
      ? numberValue >= 150 && numberValue <= 193
      : numberValue >= 59 && numberValue <= 76
  },
  hcl: (val) => /^#[0-9a-f]{6}$/i.test(val),
  ecl: (val) => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].some(color => color === val),
  pid: (val) => val.length === 9 && typeof parseInt(val, 10) === 'number',
};

// валидируем значение по ключу
const validateKey = (key, value) => ((key === 'cid')
  ? true
  : keysValidators.hasOwnProperty(key) && keysValidators[key](value));

const getIsPassportValid = (passport) => {
  for (let key in passport) {
    if (passport.hasOwnProperty(key)) {
      const isPassportValid = validateKey(key, passport[key])

      if (!isPassportValid) {
        return false;
      }
    }
  }

  return true;
}

const validPassports = newPassports.filter(getIsPassportValid)


console.log('firstResult: ', correctPassports.length);
console.log('secondResult: ', validPassports.length);
