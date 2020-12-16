const fs = require('fs');
const input = fs.readFileSync('input.txt','utf-8').split(/\n\n/g);
const rules = input[0].split(/\n/g);
const myTicket = input[1].split(/\n/g)[1].split(',');
const otherTickets = input[2].split('nearby tickets:\n')[1].split(/\n/g).map((t) => t.split(','));

function formatRules() {
    let formattedRules = rules.map((t) => {
        let [ruleName, range] = t.split(': ');
        let [range1, range2] = range.split(' or ');
        let [range1Min, range1Max] = range1.split('-');
        let [range2Min, range2Max] = range2.split('-');
        return {
            ruleName,
            range1Min: parseInt(range1Min, 10),
            range1Max: parseInt(range1Max, 10),
            range2Min: parseInt(range2Min, 10),
            range2Max: parseInt(range2Max, 10),
            isValid: (num) => {
                if((num >= parseInt(range1Min, 10) && num <= parseInt(range1Max, 10)) || (num >= parseInt(range2Min, 10) && num <= parseInt(range2Max, 10))) {
                    return true;
                }
                return false
            },
        }
    });
    return formattedRules;
}

function searchInvalid() {
    const formattedRules = formatRules();
    let invalidValues = [];
    otherTickets.forEach((t) => {
        t.forEach((f) => {
            const num = parseInt(f, 10);
            let isFieldCorrect = false;
            formattedRules.forEach((r) => {
                if(r.isValid(num)){
                    isFieldCorrect = true;
                }
            });
            if(!isFieldCorrect) invalidValues.push(num);
        });
    });
    let addInvalid = invalidValues.reduce((acc, v) => acc += v);
    console.log('Part 1 solution:', addInvalid);
}

function guessField() {
    const formattedRules = formatRules();
    // Filter bad tickets
    let validTickets = otherTickets.filter((t) => {
        let isTicketValid = true;
        t.forEach((f) => {
            const num = parseInt(f, 10);
            let isFieldCorrect = false;
            formattedRules.forEach((r) => {
                if(r.isValid(num)){
                    isFieldCorrect = true;
                }
            });
            if(!isFieldCorrect) isTicketValid = false;
        });
        return isTicketValid
    });
    let validIndex = {};
    //Search all index valid for each rules
    formattedRules.forEach((r) => {
        let index = 0;
        while(index < validTickets[0].length) {
            let valid = true;
            validTickets.forEach((ticket) => {
                if(!r.isValid(parseInt(ticket[index], 10))){ 
                    valid = false;
                }
            });
            if(valid) {
                if(!validIndex[index]) validIndex[index] = [];
                validIndex[index].push(r.ruleName);
            }
                index ++;
        }
    });

    let allRulesFound = false;
    let correctRulesIndex = {};
    // Get the rules index by removal process for rules with only 1 index
    while(!allRulesFound) {
        Object.keys(validIndex).forEach((i) => {
            if(validIndex[i].length === 1) correctRulesIndex[validIndex[i][0]] = i;
            validIndex[i] = validIndex[i].filter((r) => !correctRulesIndex[r]);
        });
        if(Object.keys(correctRulesIndex).length === formattedRules.length) allRulesFound = true;
    }
    let departureRules = [];
    Object.keys(correctRulesIndex).forEach((cr) => {
        if(cr.match(/departure/g)) departureRules.push(correctRulesIndex[cr]);
    });
    let solution = 1;
    departureRules.forEach((rIndex) => {
        solution *= parseInt(myTicket[rIndex], 10);
    })
    console.log('Part 2 solution', solution);
}

// searchInvalid(); // Part 1
guessField(); // Part 2