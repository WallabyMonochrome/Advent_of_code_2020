const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8').split(/\n/g);

let mask;
let memory = {};

function readInstruction(writeValueMethod) {
    input.forEach((i) => {
        let [type, value] = i .split(' = ');
        if(type === 'mask'){ mask = value;}
        else{
            let memSlot = parseInt(type.match(/\d+/g)[0], 10);
            writeValueMethod(memSlot, parseInt(value));
        }
    });
    let result = 0;
    Object.keys(memory).forEach((s) => result += memory[s]);
    console.log('Solution', result);
}

// Part 1
function writeInMem(memSlot, value) {
    let binValue = (value >>> 0).toString(2);
    let maskedValue = "";
    for(let i = 1; i <= mask.length; i ++) {
        if(mask[mask.length - i] === '0' || mask[mask.length - i] === '1') {
            maskedValue = parseInt(mask[mask.length - i], 10) + maskedValue;
        } else if (binValue[binValue.length - i]){
            maskedValue = (binValue[binValue.length - i])  + maskedValue;
        } else {
            maskedValue = 0 + maskedValue;
        }
    }
    return memory[memSlot] = maskedValue;
}

function computeAllPossibility(memoryMasked, potentialAddress, index) {
    if(index < 0) return parseInt(potentialAddress, 2);
    if(memoryMasked[index] === 'X'){
        return [computeAllPossibility(memoryMasked, 0 + potentialAddress, index - 1),
                computeAllPossibility(memoryMasked, 1 + potentialAddress, index - 1)]; 
    }
    return computeAllPossibility(memoryMasked, potentialAddress = memoryMasked[index] + potentialAddress, index - 1);
}

function writeQuanticValueInMem(memSlot, value) {
    let memValue = (memSlot >>> 0).toString(2);
    let memoryMasked = "";
    for(let i = 1; i <= mask.length; i ++) {
        switch(mask[mask.length - i]) {
            case '0':
                memoryMasked = (memValue[memValue.length - i] || 0)  + memoryMasked;
                break;
            case '1':
                memoryMasked = 1 + memoryMasked;
                break;
            case 'X':
                memoryMasked = 'X' + memoryMasked;
                break;
            default: break;
        }
    }
    let possibleAddress = computeAllPossibility(memoryMasked,"",memoryMasked.length - 1);
    possibleAddress = possibleAddress.flat(10000);
    possibleAddress.forEach(addr => memory[addr] = value);
}

// readInstruction(writeInMem); // Part 1
readInstruction(writeQuanticValueInMem); // Part 2