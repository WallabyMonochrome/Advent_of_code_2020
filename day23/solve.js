const fs = require('fs');
const input = fs .readFileSync('input.txt','utf-8').split('').map((e) => parseInt(e));
// console.log(input);

function runGame(cups, designated, round) {
    console.log('ROUND: ', round);
    if(round >= 100) return cups;
    let pickUpCups = cups.splice(cups.indexOf(designated) + 1, 3);
    if(pickUpCups.length < 3) {
        pickUpCups.push(...cups.splice(0, 3 - pickUpCups.length));
    }
    let destination = designated - 1;
    let destinationCupIndex = null;
    while(destinationCupIndex === null) {
        if(cups.indexOf(destination) !== -1) destinationCupIndex = cups.indexOf(destination);
        else destination = destination - 1 < 1 ? input.length : destination -1;
    }
    cups.splice(destinationCupIndex + 1, 0,...pickUpCups);
    return runGame(cups, cups[cups.indexOf(designated) + 1] || cups[0], round + 1);
}

function runSeriousGame(initialCups, maxRound) {
    console.time("dbsave");
    let round = 0;
    let cups = initialCups;
    let designated = cups[0];
    while(round < maxRound) {
        if(round % 1000 === 0) console.log('Hmmm: ', round);
        let pickUpCups = cups.splice(cups.indexOf(designated) + 1, 3);
        if(pickUpCups.length < 3) {
            pickUpCups.push(...cups.splice(0, 3 - pickUpCups.length));
        }
        let destination = designated - 1;
        let destinationCupIndex = null;
        while(destinationCupIndex === null) {
            let destIndex = cups.indexOf(destination);
            if(destIndex !== -1) destinationCupIndex = destIndex;
            else {
                if(destination - 1 >= 1) {
                    destination --;
                } else {
                    destination = input.length;
                }
            }
        }
        cups.splice(destinationCupIndex + 1, 0,...pickUpCups);
        designated = cups[cups.indexOf(designated) + 1] || cups[0];
        round ++;
    }
    console.timeEnd("dbsave");
    return cups;
}

//Part 1
// let solution = runGame([...input], input[0], 0);

let cups = [...input];
for(let i = input.length; i < 1000000; i++) {
    cups.push(i);
}
//Part 2
let solution = runSeriousGame([...cups], 10000000);

let before = solution.splice(0, solution.indexOf(1));
solution = [...solution, ...before];
solution.shift();
// console.log('Part 1:' , JSON.stringify(solution).replace(/,/g, ''));

console.log('Part 2', solution[0], solution[1], solution[0] * solution[1]);