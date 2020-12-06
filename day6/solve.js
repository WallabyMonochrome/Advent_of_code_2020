const fs = require('fs');
const { array } = require('prop-types');

let input = [];
input = fs.readFileSync('input.txt', 'utf8').split('\n\n');

/**
 * Part 1
 */

function searchYesInGroup(group) {
    let groupFilter = group.replace(/\n/g, '');
    let yesAnswer = {};
    groupFilter.split('').forEach(a => {
        yesAnswer[a] = true;
    });
    return Object.keys(yesAnswer).length;
}

function searchAllGroup() {
    let answerSum = 0;
    input.forEach((g) => {
        answerSum += searchYesInGroup(g);
    });
    return answerSum;
}

/**
 * Part 2
 */

function searchEveryYesInGroup(group) {
    let nbParticipant = group.match(/\n/g) ? group.match(/\n/g).length + 1 : 1;
    let groupFilter = group.replace(/\n/g, '');
    let uniqAnswer = new Set(groupFilter);
    let yesAnswer = 0;
    uniqAnswer.forEach(e => {
        if(groupFilter.match(new RegExp(`${e}`, 'g')).length === nbParticipant) yesAnswer++;
    });
    return yesAnswer;
}

function bisSearchAllGroup() {
    let answerSum = 0;
    input.forEach((g) => {
        answerSum += searchEveryYesInGroup(g);
    });
    return answerSum;
}


const solution1 = searchAllGroup();
console.log('Part 1', solution1);

const solution2 = bisSearchAllGroup();
console.log('Part 2', solution2);