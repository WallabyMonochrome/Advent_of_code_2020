const input = require('./input');

function findRight2NumberAddition(expectedNumber) {
    for (let i= 0; i< input.length; i++) {
        for (let j = i + 1; j < input.length; j++) {
            if(input[i] + input[j] === expectedNumber) {
                return([input[i], input[j]]);
            }
        }
    }
}

function findRight3NumberAddition(expectedNumber) {
    for (let i= 0; i< input.length; i++) {
        for (let j = i + 1; j < input.length; j++) {
            for (let e = j + 1; e < input.length; e ++) {
                if(input[i] + input[j] + input[e] === expectedNumber) {
                    return([input[i], input[j], input[e]]);
                }
            }
        }
    }
}
/**
 * First puzzle
 */
const solutionPair = findRight2NumberAddition(2020);
const solution1 = solutionPair[0] * solutionPair[1];
console.log('Solution1: ', solution1);

/**
 * Second puzzle
 */
const solutionTrio = findRight3NumberAddition(2020);
const solution2 = solutionTrio[0] * solutionTrio[1] * solutionTrio[2];
console.log('Solution 2 ', solution2);