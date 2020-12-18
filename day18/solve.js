const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8').split(/\n/g);

function findNextParenthesis(index, tab) {
    let openingPar = 0;
    for(let i = index; i < tab.length; i++) {
        if(tab[i] === ')'){
            if(openingPar === 0) {
                return i;
            } else {
                openingPar --;
            }
        } if(tab[i] === '('){
            openingPar++;
        }
    }
}

//Part 1
function evaluateExpression(ex) {
    let leftValue = 0;
    let operator = '';
    for(let i = 0; i<ex.length; i++) {
        let val = ex[i];
        if(typeof val === 'number') {
            if(operator === '+') leftValue += val;
            if(operator === '*') leftValue *= val;
            if(!operator) leftValue = val;
        }
        if(val === '+' || val === '*') operator = val;
        if(val === '(') {
            let value = evaluateExpression(ex.slice(i + 1,findNextParenthesis(i + 1, ex)));
            if(operator === '+') leftValue += value;
            if(operator === '*') leftValue *= value;
            if(!operator) leftValue = value;
            i = findNextParenthesis(i + 1, ex);
        }
    }
    return leftValue;
}

// Part 2
function evaluateExpressionAdvenced(ex) {
    let leftValue = 0;
    let operator = '';
    for(let i = 0; i < ex.length; i++) {
        console.log('EX:', ex[i]);
        let val = ex[i];
        if(typeof val === 'number') {
            if(operator === '+') leftValue += val;
            if(!operator) leftValue = val;
        }
        if(val === '+') operator = val;
        if(val === '*') {
            return leftValue *= evaluateExpressionAdvenced(ex.slice(i + 1));
        } 
        if(val === '(') {
            let value = evaluateExpressionAdvenced(ex.slice(i + 1,findNextParenthesis(i + 1, ex)));
            if(operator === '+') leftValue += value;
            if(!operator) leftValue = value;
            i = findNextParenthesis(i + 1, ex);
        }
    }
    return leftValue;
}

function evaluateAllExpression() {
    let total = 0;
    input.forEach((ex) => {
        total += evaluateExpressionAdvenced(ex.replace(/ /g,'').split('').map((v) => parseInt(v, 10) ? parseInt(v, 10): v));
    });
    console.log('Part: ', total);
}

evaluateAllExpression();
