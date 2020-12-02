const fs = require('fs');

let input = [];
input = fs.readFileSync('input.txt', 'utf8').split('\n');

/**
 * 
 * Puzzle 1
 */

function checkValidPassword(input) {
    const validPassword = [];
    input.forEach(i => {
       const [policy, password] = i.split(':');
       const [rep, char] = policy.split(' ');
       const [pMin, pMax] = rep.split('-');
       let charOccurence = password.match(new RegExp(char, 'g'));
       charOccurence = charOccurence ? charOccurence.length : 0;
       if(charOccurence <= pMax && charOccurence >= pMin) {
           validPassword.push(i);
       }
    });
    return validPassword;
}

/**
 * 
 * Puzzle 2
 */

function checkValidPasswordBis(input) {
    const validPassword = [];
    input.forEach(i => {
       const [policy, password] = i.split(':');
       const [rep, char] = policy.split(' ');
       const [pos1, pos2] = rep.split('-');
       const passwordClean = password.split('').filter(p => ( p !== ' '));
       if((passwordClean[pos1 - 1] === char && passwordClean[pos2 - 1] !== char) ||
       (passwordClean[pos2 - 1] === char && passwordClean[pos1 - 1] !== char)) {
           validPassword.push(i);
       }
    });
    return validPassword;
}

const validPassword = checkValidPassword(input);
console.log(validPassword.length);

const validPasswordBis = checkValidPasswordBis(input);
console.log(validPasswordBis.length);