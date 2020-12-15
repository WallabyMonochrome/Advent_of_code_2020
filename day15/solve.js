const fs = require('fs');

const input = fs.readFileSync('input.txt','utf8').split(',').map((e) => parseInt(e, 10));

function playGame() {
    let gameHistory = {};
    input.forEach((n , index) => gameHistory[n] = [index]);
    let lastNumber = input[input.length - 1];
    for(let i = Object.keys(gameHistory).length; i < 30000000; i++) {
        if(i%1000000 === 0) console.log('In progress ', i);
        if(gameHistory[lastNumber].length === 1) {
            if(!gameHistory[0]) gameHistory[0] = [];
            if(gameHistory[0].length >= 2) gameHistory[0].shift();
            gameHistory[0].push(i);
            lastNumber = 0;
        } else {
            let lastSeen = gameHistory[lastNumber][gameHistory[lastNumber].length - 2];
            let seenBefore = gameHistory[lastNumber][gameHistory[lastNumber].length - 1];
            let range = seenBefore - lastSeen;
            if(!gameHistory[range]) gameHistory[range] = [];
            gameHistory[range].push(i);
            lastNumber = range;
        }
    }
    console.log('over');
    console.log(lastNumber);
}

playGame();