const fs = require('fs');

let input = [];
input = fs.readFileSync('input.txt', 'utf8').split('\n');


function riding(input, position, bottom, right) {
    let positionUpdate = { x: position.x, y: position.y };
    let encouterTree = false;
    positionUpdate.x += right;
    if (positionUpdate.x >= input[0].length) {
        positionUpdate.x -= input[0].length;
    }
    positionUpdate.y += bottom;
    if (!input[positionUpdate.y]) {
        return { positionUpdate, encouterTree };
    }
    if (input[positionUpdate.y][positionUpdate.x] === '#') {
        encouterTree = true;
    }
    return { positionUpdate, encouterTree };
}

function fullRide(right, bottom) {
    let position = { x: 0, y: 0 };
    let treeEncountered = 0;
    while (position.y <= input.length) {
        let result;
        result = riding(input, position, bottom, right);
        position = result.positionUpdate;
        if (result.encouterTree) treeEncountered++;
    }
   return treeEncountered
}

const rideResult = [];

rideResult.push(fullRide(1, 1));
rideResult.push(fullRide(3, 1));
rideResult.push(fullRide(5, 1));
rideResult.push(fullRide(7, 1));
rideResult.push(fullRide(1, 2));

console.log(rideResult.reduce((buffer, currentValue) => (buffer * currentValue)));
