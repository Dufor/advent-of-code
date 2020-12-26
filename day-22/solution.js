const fs = require('fs');

let input = fs.readFileSync('input.txt', 'utf-8')
    .trim()
    .split('\n\n')
    .map(el => el.split('\n').slice(1))

let player1 = input[0].map(Number);
let player2 = input[1].map(Number);

while (player1[0] && player2[0]) {
    const isFirstWin = player1[0] > player2[0];

    const first = player1.shift();
    const second = player2.shift();

    if (isFirstWin) {
        player1.push(first, second);
    } else {
        player2.push(second, first);
    }
}

const winner = player1.length > player2.length ? player1 : player2;

let result = 0;
for (let i = 0; i < winner.length; i++) {
    const multiple = winner.length - i;
    result += winner[i] * multiple;
}

console.log(result)

