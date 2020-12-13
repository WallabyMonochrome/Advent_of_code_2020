const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf-8').split(/\n/g);
const earliestTimestamp = parseInt(input[0], 10);
const busList = input[1].split(',').filter(e => parseInt(e, 10)).map(e => parseInt(e, 10)); // PART 1
const busListOrdered = input[1].split(',').map((e, index) => ({ order: index, id: parseInt(e, 10) })).filter(e => e.id);

console.log(busListOrdered);

// PART 1
function getEarliestBus() {
    let earliest = null;
    let earliestBus = null;
    busList.forEach(b => {
        let mult = Math.ceil(earliestTimestamp / b);
        let firstDepart = b * mult;
        if (firstDepart < earliest || !earliest) {
            earliest = firstDepart;
            earliestBus = b;
        }
        console.log(b, firstDepart, earliestTimestamp);
    });
    console.log('Part 1 solution', (earliest - earliestTimestamp) * earliestBus);
}

function searchMinimal2Bus(beforeId, valueOffset, after) {
    let multBeforeId = beforeId + valueOffset;
    while(true) {
        if((multBeforeId + after.order)%after.id == 0){            
            return [beforeId*after.id, multBeforeId];
        } else {
            multBeforeId += valueOffset;
       }
    }
}

function searchMinimalTimestamp() {
    let before = busListOrdered[0].id;
    let valueOffset = busListOrdered[0].id;
    for(let i = 1; i<busListOrdered.length; i++) {
        [valueOffset, before] = searchMinimal2Bus(before, valueOffset, busListOrdered[i]);
        console.log('ID new', valueOffset, before);
    }
    console.log('Part 2', before);

}


// getEarliestBus(); // Part 1
searchMinimalTimestamp();