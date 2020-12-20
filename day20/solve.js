const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8').split(/\n\n/g);
const tileList = {};
// const tileEdge = {};
const tileRotation = {};
input.forEach((t) => {
    let [title, tile] = t.split(/:\n/g);
    const tileId = title.split(' ')[1];
    tile = tile.split(/\n/g);
    tileList[tileId] = tile;
});

function visualizeTile(id, tile) {
    console.log('Tile: ', id)
    tile.forEach((t) => {
        console.log(...t);
    });
    console.log('');
}

function getTileEdge(tile) {
    let edge = [];
    let up = [];
    let left = [];
    let down = [];
    let right = [];
    for(let i = 0; i < tile.length; i++) {
        up.push(tile[0][i]);
        left.push(tile[i][0]);
        down.push(tile[tile.length - 1][i]);
        right.push(tile[i][tile.length - 1]);
    }
    return{
        up,
        left,
        down,
        right,
    }
}

function rotateTileRight(tile) {
    let rotatedTile = [];
    let basesLine = [];
    for(let i = 0; i< tile.length; i++) {
        basesLine.push(tile[i]);
    }
    for(let i = 0; i < tile.length; i++) {
        rotatedTile[i] = [];
        for(let j = 0; j < tile.length; j++) {
            rotatedTile[i].push(basesLine[tile.length - 1 - j][i]);
        }
    }
    return rotatedTile;
}

function flipTile(tile) {
    let flippedTile = [];
    for(let i = 0; i < tile.length; i++) {
        flippedTile[i] = [];
        flippedTile[i] = [...tile[i]].reverse();
    }
    return flippedTile;
}

function getTileRotation(id, tile) {
    let r0 = [...tile];
    let r0Flip = flipTile(r0);
    let r90 = rotateTileRight(r0);
    let r90Flip = flipTile(r90);
    let r180 = rotateTileRight(r90);
    let r180Flip = flipTile(r180);
    let r270 = rotateTileRight(r180); 
    let r270Flip = flipTile(r270); 
    tileRotation[id] = [r0,r0Flip,r90,r90Flip,r180,r180Flip,r270,r270Flip];
}

function getBigPicture(placedTiles, tileBoard, x, y, completionBoard, depth) {
    if(placedTiles.length === Object.keys(tileRotation).length) {
        return {completion: completionBoard, board: tileBoard};
    }
    const board = [...tileBoard].map((row) => [...row]);
    let pTile = [...placedTiles];
    let upEdge = [];
    let leftEdge = [];
    let downEdge = [];
    let rightEdge = [];
    // get Up tile
    if(board[x] && board[x][y - 1]) {
        upEdge =getTileEdge(board[x][y -1]).down;
    }
    // get Left tile
    if(board[x - 1] && board[x - 1][y]) {
        leftEdge = getTileEdge(board[x - 1][y]).right;
    }
    // get down tile
    if(board[x] && board[x][y + 1]) {
        downEdge = getTileEdge(board[x][y + 1]).up;
    }
    // get right tile
    if(board[x + 1] && board[x + 1][y]) {
        rightEdge = getTileEdge(board[x + 1][y]).left;
    }
    // Try to match tile
    let theOne = false;
    Object.keys(tileRotation).forEach((tId) => {
        if (!pTile.find((e) => e === tId)) {
            tileRotation[tId].forEach((t) => {
                let isPlacable = true;
                let edge = getTileEdge(t);
                if (upEdge.length) {
                    if (!(JSON.stringify(edge.up) === JSON.stringify(upEdge))) {
                        isPlacable = false;
                    }
                }
                if (leftEdge.length) {
                    if (!(JSON.stringify(edge.left) === JSON.stringify(leftEdge))) {
                        isPlacable = false;
                    }
                }
                if (downEdge.length) {
                    if (!(JSON.stringify(edge.down) === JSON.stringify(downEdge))) {
                        isPlacable = false;
                    }
                }
                if (rightEdge.length) {
                    if (!(JSON.stringify(edge.right) === JSON.stringify(rightEdge))) {
                        isPlacable = false;
                    }
                }
                if(isPlacable) {
                    fitOne = true;
                    board[x][y] = t;
                    let newX = x;
                    let newy = y;
                    if(x+1 >= maxRange) {
                        newX = 0;
                        newy = y + 1;
                    } else {
                        newX = x + 1;
                    }
                    let comp = [...completionBoard];
                    comp.push({x, y, id: tId});
                    let result = getBigPicture([tId,...pTile], board, newX, newy, comp, depth + 1);
                    if(result) theOne = result;
                }
            });
        }
    }); 
    return theOne;
}

function removeEdge(tile) {
    let newTile = [...tile];
    newTile.shift();
    newTile.pop();

    for(let i = 0; i < newTile.length; i++) {
        newTile[i] = newTile[i].slice(1,tile[i].length - 1);
    }
    return newTile;
}

function generateBigImage(board) {
    let col = 0;
    const bigPic = [];
    let mergeLine = [];
    for(col; col < board.length; col ++){
        let line = [];
       for(let row = 0; row < board.length; row ++) {
           line.push(removeEdge(board[row][col]));
       }
       let newline = [];
       line.forEach((l) => {
           for(let i = 0; i < l.length; i++) {
               if(col === 0 && i === 0) {
                   visualizeTile(3232, l);
               }
            if(!newline[i]) newline[i] = [];
            newline[i].push(...l[i]);
           }
       });
       for(let i = 0; i < newline.length; i++) {
            mergeLine.push(newline[i]);
       }
    }
    let one = rotateTileRight(mergeLine);
    let two = rotateTileRight(one);
    // visualizeTile('OK: ', one);
    return flipTile(two);
}


function searchMonsterInImg(pattern, bigImg) {
    // visualizeTile(12, bigImg);
    let spotted = 0;
    for(let i = 0; i < bigImg.length; i++) {
        let offset = 0;
        while(offset < bigImg.length) {
            let isDetected = true;
            pattern.forEach((pl, index) => {
                pl.forEach((c) => {
                    if(bigImg[i+index]){
                        if(bigImg[i + index][c + offset] !== '#') {
                            isDetected = false;
                        }
                    } else {
                        isDetected = false;
                    }
                });
            });
            if(isDetected) {
                spotted ++;
                pattern.forEach((pl, index) => {
                    pl.forEach((c) => {
                        if(bigImg[i+index]){
                            if(bigImg[i + index][c + offset] === '#') {
                                bigImg[i+ index][c + offset] = 'X';
                            }
                        } else {
                            isDetected = false;
                        }
                    });
                });
            }
            offset++;
        }

    }
    if(spotted){
        console.log('Spotted captain');
    }
    let countMuddy = 0;
    for(let j = 0; j < bigImg.length; j++) {
        for(let t = 0; t < bigImg[0].length; t++) {
            if(bigImg[j][t] === '#') countMuddy ++;
        }
    }
    console.log('LE muddy= ', countMuddy);
    return countMuddy;
    // visualizeTile(12, bigImg)
}

Object.keys(tileList).forEach((t) => {
    getTileRotation(t, tileList[t]);
});
// let maxRange = 12; //
// let initValue = [];
// for(let i = 0; i<maxRange; i++) {
//     initValue.push(0);
// }
// let board = [...initValue];
// board = board.map((e) => []);
// let result = getBigPicture([], board, 0, 0, [], 0);
// let corner = [];
// result.completion.forEach((r) => {
//     if(r.x === 0 && r.y === 0){
//         corner.push(r.id);
//     }
//     if(r.x === maxRange - 1 && r.y === 0){
//         corner.push(r.id);
//     }
//     if(r.x === 0 && r.y === maxRange - 1){
//         corner.push(r.id);
//     }
//     if(r.x === maxRange - 1 && r.y === maxRange - 1){
//         corner.push(r.id);
//     }
// });
// console.log(result.completion);

// console.log('Part 1: ',corner.reduce((acc ,val) => acc *= parseInt(val, 10), 1));

// const bigImg = generateBigImage(result.board);
// fs.writeFileSync('limg.json', JSON.stringify(bigImg));

//Cache for img

let bigImg = JSON.parse(fs.readFileSync('limg.json'));
bigImg = flipTile(bigImg);
bigImg = rotateTileRight(bigImg);
bigImg = flipTile(bigImg);

// let pattern = fs.readFileSync('pattern.txt','utf-8').split(/\n/g);
let pattern = [];
pattern.push([18]);
pattern.push([0,5, 6,11,12,17,18,19]);
pattern.push([1,4, 7, 10, 13, 16]);

searchMonsterInImg(pattern, bigImg);
