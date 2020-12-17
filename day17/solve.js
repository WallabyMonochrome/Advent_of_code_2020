const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf-8').split(/\n/g);
console.log(input);

function computeInitialState() {
    let matrice = new Set();
    input.forEach((row, iRow) => {
        row.split('').forEach((col, iCol) => {
            if(col === '#'){
                matrice.add(`${iCol},${iRow},0`);
            }
        });
    });
    return matrice;
}

function getCoordinate(cord) {
    return cord.split(',').map((e) => parseInt(e, 10));
}


function checkMatriceState(minX,maxX,minY,maxY,minZ,maxZ, matrice) {
    let updatedMatrice = new Set();
    for (let x = minX - 1; x <= maxX + 1; x++) {
        for (let y = minY - 1; y <= maxY + 1; y++) {
            for (let z = minZ - 1; z <= maxZ +1; z++) {
                let an = checkActiveNeighboor(`${x},${y},${z}`, matrice);
                if(matrice.has(`${x},${y},${z}`)) {
                    if(an === 2 || an === 3) {
                        updatedMatrice.add(`${x},${y},${z}`);
                    }
                } else {
                    if(an === 3) {
                        updatedMatrice.add(`${x},${y},${z}`);
                    }
                }
            }
        }
    }
    return updatedMatrice;
}

function checkActiveNeighboor(cord, matrice) {
    const [x, y, z] = getCoordinate(cord);
    let activeNeighboor = 0;
    for (let xi = x - 1; xi <= x + 1; xi++) {
        for (let yi = y - 1; yi <= y + 1; yi++) {
            for (let zi = z - 1; zi <= z + 1; zi++) {
                if(!(xi === x && yi === y && zi === z)) {
                    if(matrice.has(`${xi},${yi},${zi}`)) {
                        activeNeighboor ++;
                    }
                }
            }
        }
    }
    return activeNeighboor;
}

function getMatriceMinMax(matrice) {
    let [newMinX,newMaxX,newMinY,newMaxY,newMinZ,newMaxZ] = [0,0,0,0,0,0];
    const arrayX = [];
    const arrayY = [];
    const arrayZ = [];
    matrice.forEach((cord) => {
        let [x,y,z] = getCoordinate(cord);
        arrayX.push(x);
        arrayY.push(y);
        arrayZ.push(z);
    });
    newMinX = Math.min(...arrayX);
    newMaxX = Math.max(...arrayX);
    newMinY = Math.min(...arrayY);
    newMaxY = Math.max(...arrayY);
    newMinZ = Math.min(...arrayZ);
    newMaxZ = Math.max(...arrayZ);
    return [newMinX, newMaxX, newMinY, newMaxY, newMinZ, newMaxZ];
}

let matrice = computeInitialState();
for(let i = 0; i<6; i++) {
    let [minX,maxX,minY,maxY,minZ,maxZ] = getMatriceMinMax(matrice);
    matrice = checkMatriceState(minX,maxX,minY,maxY,minZ,maxZ, matrice);
}
console.log('Part 1: ', matrice.size);