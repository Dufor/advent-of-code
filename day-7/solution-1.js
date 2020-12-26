const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8').split('\n');

const deleteBagsAndCounts = (str) => str.replace(/bags|bag|\.|[0-9]/gi, '').trim();

const mapInput = (rulesString) => rulesString.split(' contain ')
  .map((ruleParts, i) => (
    i === 0
      ? deleteBagsAndCounts(ruleParts)
      : ruleParts.split(',').map(valuesRule => deleteBagsAndCounts(valuesRule))
  ));

const getRules = (stringRulesList) => {
  return stringRulesList.reduce((rules, rule) => {
    const [key, value] = mapInput(rule);
    return {
      ...rules,
      [key]: value
    }
  }, {});
}

const rules = getRules(input);

const getHasShinyGold = arr => arr.includes('shiny gold');

const toShinyGold = (rulesValues) => getHasShinyGold(rulesValues)
  || rulesValues.some(rule => rules.hasOwnProperty(rule) && toShinyGold(rules[rule]))

const getResult = () => {
  let count = 0
  for (let rule in rules) {
    if (rules.hasOwnProperty(rule) && !!rules[rule] && toShinyGold(rules[rule])) {
      count++
    }
  }

  return count;
}



console.log(getResult())
