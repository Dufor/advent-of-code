const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8').split('\n');

const deleteBags = (str) => str.replace(/bags|bag|\./gi, '').trim();

const mapInput = (rulesString) => rulesString.split(' contain ')
  .map((ruleParts, i) => (
    i === 0
      ? deleteBags(ruleParts)
      : ruleParts.split(',').map(valuesRule => deleteBags(valuesRule))
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
const SHINY_GOLD = 'shiny gold'

const calculateCounts = (rulesList = 0) => (
  rulesList.reduce((acc, rule) => {
    const count = Number(rule.replace(/[a-z]/gi, '').trim());
    const key = rule.replace(/[0-9]/g, '').trim();

    const multiplier = rules[key] ? calculateCounts(rules[key]) : 0

    return acc + count + count * multiplier
  }, 0)
)

console.log('calculateCounts: ', calculateCounts(rules[SHINY_GOLD]));
