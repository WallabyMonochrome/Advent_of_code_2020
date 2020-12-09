const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf-8').split('\n');

function findRight2NumberAddition(numList, expectedNumber) {
    for (let i = 0; i < numList.length; i++) {
        for (let j = i + 1; j < numList.length; j++) {
            if (parseInt(numList[i], 10) + parseInt(numList[j], 10) === parseInt(expectedNumber, 10)) {
                return true;
            }
        }
    }
    return false;
}

function searchWeakness(lengthBuffer) {
    for (let i = lengthBuffer; i < input.length; i++) {
        if (!findRight2NumberAddition(input.slice(i - lengthBuffer, i), input[i])) {
            return parseInt(input[i], 10);
        }
    }
}

function searchContiguousSet() {
    let weakNumber = searchWeakness(25);
    let notFound = true;
    let index = 0;
    while (notFound) {
        let sum = 0;
        for (let i = index; sum < weakNumber; i++) {
            sum += parseInt(input[i], 10);
            if (sum === weakNumber) {
                notFound = false;
                return [index, i]; // Start, end
            }
        }
        index++;
    }
}

// searchWeakness(25); // PART 1
let contiguousSuit = searchContiguousSet(); // Part 2
let rangeArray = input.slice(contiguousSuit[0], contiguousSuit[1] - 1);
rangeArray.sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
let min = parseInt(rangeArray[0]);
let max = parseInt(rangeArray[rangeArray.length - 1]);
console.log(min + max);
