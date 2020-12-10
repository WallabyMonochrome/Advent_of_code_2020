const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf-8').split(/\n/).map((v) => parseInt(v, 10));
input.push(0); // First adapter
input.sort((a, b) => a - b);

// PART 1
function useAllAdapter() {
    let oneJoult = 0;
    let twoJoult = 0;
    let threeJoult = 0;
    for (let i = 1; i < input.length; i++) {
        switch (input[i] - input[i - 1]) {
            case 1:
                oneJoult++;
                break;
            case 2:
                twoJoult++;
                break;
            case 3:
                threeJoult++;
                break;
            default:
                break;
        }
    }
    threeJoult++; //Built in last adapter
    console.log('Part 1 solution: ', oneJoult * threeJoult);
}

// PART 2
function computePossibility() {
    const possibleBranch = {};
    input.reverse();
    for(let i = 0 ; i < input.length - 1; i++ ){
        possibleBranch[input[i]] = [input[i + 1]];
        if(input[i] - input[i + 2] <= 3) possibleBranch[input[i]].push(input[i + 2]);
        if(input[i] - input[i + 3] <= 3) possibleBranch[input[i]].push(input[i + 3]);
    }
    const nodeWeight = {};
    Object.keys(possibleBranch).forEach(pb => {
        nodeWeight[pb] = 0;
        possibleBranch[pb].forEach(n => {
            nodeWeight[pb] += nodeWeight[n] || 1;
        });
    })
    console.log('Solution part 2', nodeWeight[input[0]]); //Highest adapter
}

computePossibility();
// useAllAdapter();