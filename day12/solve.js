const fs = require('fs');

const input = fs.readFileSync('input.txt','utf-8').split(/\n/g);
const direction = input.map((c) => {
    const dir = c.slice(0,1);
    const unit = parseInt(c.slice(1), 10);
    return {dir, unit}
});

function moveDirection(shipPosition, cord) {
    let updateSP = shipPosition;
    switch(cord.dir) {
        case 'N':
            updateSP.N += cord.unit;
            break;
        case 'S':
            updateSP.N -= cord.unit;
            break;
        case 'W':
            updateSP.E -= cord.unit;
            break
        case 'E':
            updateSP.E += cord.unit;
            break;
        default:
            break;
    }
    return updateSP;
} 

function navigate() {
    const angle = ['E','S','W','N'];
    let shipAngle = 0; //Ref angle array
    let shipPosition = {N: 0, E:0};
    direction.forEach(cord => {
        if(angle.indexOf(cord.dir) != -1) {
           shipPosition = moveDirection(shipPosition, cord);
        }
        if(cord.dir === 'L' || cord.dir === 'R') {
            let angleMove = cord.dir === 'L' ? -cord.unit/90 : cord.unit/90;
            if(shipAngle + angleMove < 0) shipAngle = angle.length - Math.abs(shipAngle + angleMove);
            else shipAngle = (shipAngle + angleMove) % angle.length;
        }
        if(cord.dir === 'F') {
            shipPosition = moveDirection(shipPosition, {dir: angle[shipAngle], unit: cord.unit}); // Part 1

        }
    });
    console.log(shipPosition);
    console.log('PART 1', Math.abs(shipPosition.N) + Math.abs(shipPosition. E));
}

function navigateWithWaypoint() {
    const angle = ['E','S','W','N'];
    let wayPoint = {N:1, E:10};
    let shipAngle = 0; //Ref angle array
    let shipPosition = {N: 0, E:0};
    direction.forEach(cord => {
        if(angle.indexOf(cord.dir) != -1) {
           wayPoint = moveDirection(wayPoint, cord);
        }
        if(cord.dir === 'L' || cord.dir === 'R') {
            let shiftNumber = cord.dir === 'L' ? -cord.unit/90 : cord.unit/90;
            let isRight = shiftNumber < 0 ? -1: 1;
            for(let i = 0; i < Math.abs(shiftNumber); i++) {
                let {E, N} = wayPoint;
                if(isRight != -1) {
                    wayPoint.E = N;
                    wayPoint.N = -E;
                } else {
                    wayPoint.N = E;
                    wayPoint.E = -N;
                }
            }
        }
        if(cord.dir === 'F') {
            for(let i = 0; i < cord.unit; i++) {
                shipPosition.N += wayPoint.N;
                shipPosition.E += wayPoint.E;
            }
        }
    });
    console.log('PART 2', Math.abs(shipPosition.N) + Math.abs(shipPosition. E));
}

// navigate(); //PART 1
navigateWithWaypoint(); //PART 2