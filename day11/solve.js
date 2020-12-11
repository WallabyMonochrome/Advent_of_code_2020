const fs = require('fs');

const input = fs.readFileSync('input.txt','utf8').split(/\n/g);
const initialPlan = input.map((row) => {
    return row.split('');
});

// PART 1
function _isAdjacentSeatOccupied(array, indexRow, indexCol) {
    let occupiedSeat = 0;
   for(let x = -1 ;x <= 1 ; x++) {
        for(let y = -1; y <= 1; y++){
            if(x === 0 && y === 0) continue;
            if(array[indexRow + y] && array[indexRow + y][indexCol + x] && array[indexRow + y][indexCol + x] === '#'){
                occupiedSeat ++
            }
        }
   }
   return occupiedSeat;
}

// PART 2
function _isAdjacentInViewSeatOccupied(array, indexRow, indexCol) {
    let occupiedSeat = 0;
    for(let x = -1 ;x <= 1 ; x++) {
         for(let y = -1; y <= 1; y++){
             if(x === 0 && y === 0) continue;
            if(exploreDirectionIsOccupied(array, indexRow + y, indexCol + x,y, x)) occupiedSeat ++
         }
    }
    return occupiedSeat;
}

function exploreDirectionIsOccupied(array, indexRow, indexCol, dirRow, dirCol) {
    if(!array[indexRow] || !array[indexRow][indexCol] || array[indexRow][indexCol] === 'L') {
        return false;
    }
    if(array[indexRow][indexCol] === '#') {
        return true;
    }
    return exploreDirectionIsOccupied(array, indexRow + dirRow, indexCol + dirCol, dirRow, dirCol);
}

function startRound(plan, adjacentMethod, maxAdjSeat) { //Different method and max adjacent seat for Part 1 and Part 2
    const planUpdate = [...plan].map((row) => [...row]);
    plan.forEach((row, indexRow) => {
        row.forEach((seat ,indexCol) => {
            if(seat === 'L' && !adjacentMethod(plan, indexRow, indexCol)) {
                planUpdate[indexRow][indexCol] = '#';
            }
            if(seat === '#' && adjacentMethod(plan, indexRow, indexCol) >= maxAdjSeat){ // 4 for PART 1 / 5 for PART 2
                planUpdate[indexRow][indexCol] = 'L';
            }
        });
    });
    return planUpdate;
}

function computeOccupiedSeat(plan) {
    return  plan.reduce((acc, value) => {
        value.forEach(s => {
            if(s ==='#') acc++;
        });
        return acc;
    }, 0);
}

function run() {
    let occupiedSeat = 0;
    let continueRound = true;
    let plan = initialPlan;
    while(continueRound){
        let newOccupiedSeat = 0;
        // plan = startRound(plan, _isAdjacentSeatOccupied, 4); // Part 1
        plan = startRound(plan, _isAdjacentInViewSeatOccupied, 5); // Part 2
        newOccupiedSeat = computeOccupiedSeat(plan);
        if(newOccupiedSeat === occupiedSeat) {
            continueRound = false;
        }
        occupiedSeat = newOccupiedSeat;
    }
    console.log('Seat occupied', occupiedSeat);
}

run();