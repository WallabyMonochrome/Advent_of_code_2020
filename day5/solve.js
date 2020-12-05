const fs = require('fs');

let input = [];
input = fs.readFileSync('input.txt', 'utf8').split('\n');

function getNumFromBinary(bin) {
    let number = 1;
    let operator = 1;
    for(let i=0; i < bin.length; i++) {
        let index = bin.length - i - 1;
        number += bin[index] * operator;
        operator = operator * 2;
    }
    return number - 1; // 0 to 127
}

function formatToBinary(bin) {
    return bin.replace(/F/g, 0).replace(/B/g, 1).replace(/L/g, 0).replace(/R/g, 1);
}

function getMySeatId() {
    let plane = [];
    let seatId = 0;
    input.forEach((i) => {
        const row = i.substring(0, i.length - 3);
        const column = i.substring(i.length - 3);
        const rowId = getNumFromBinary(formatToBinary(row));
        const columnId = getNumFromBinary(formatToBinary(column));
        const seatId = rowId * 8 + columnId;
        plane.push(seatId)
    });
    plane = plane.sort((a, b) => (a - b));
    plane.forEach((s, i) => {
        if(plane[i - 1] === s - 2) {
            seatId = s - 1;
        }
    });
    return seatId;
}

function getMaxSeatId() {
    let max = 0;
    input.forEach((i) => {
        const row = i.substring(0, i.length - 3);
        const column = i.substring(i.length - 3);
        const rowId = getNumFromBinary(formatToBinary(row));
        const columnId = getNumFromBinary(formatToBinary(column));
        const seatId = rowId * 8 + columnId;
        if(seatId > max) max = seatId;
    });
    return max;
}

const max = getMaxSeatId();
console.log('max', max);

const seatId = getMySeatId();
console.log('seatid', seatId);


