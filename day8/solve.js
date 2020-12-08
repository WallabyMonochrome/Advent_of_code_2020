const fs = require('fs');

let input = [];
input = fs.readFileSync('input.txt', 'utf8').split('\n');

function formatNumber(num) {
    return num[0] === '+' ? parseInt(num.substring(1),10) : -parseInt(num.substring(1),10);
}

//Part 1
function runCode(hasChange, acc, index, code) {
    while(code[index]) {
        const [instruction, value] = code[index].split(' ');
        let formatValue = formatNumber(value);
        code[index] = false; // Set to false to know when loop
        if(instruction === 'acc') {
            acc += formatValue;
            index ++;
        }
        if(instruction === 'jmp'){
            if(!hasChange) runCode(true, acc, index + 1, [...code]) //FOR PART 2
            index += formatValue;
        }
        if(instruction === 'nop') {
            if(!hasChange) runCode(true, acc, index + formatValue, [...code]); //FOR PART 2
            index ++;
        }
    }
    if(index === code.length) {
        console.log('Finished accordingly with acc value', acc);
        return true;
    }
    return false;
}

runCode(false, 0, 0, input);