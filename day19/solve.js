const fs = require('fs');

const [rules, data] = fs.readFileSync('input.txt', 'utf8').split(/\n\n/g);
const dictRules = {};

function registerAllRules() {
    rules.split(/\n/g).forEach((r) =>{
       let [ruleNumber, ruleDesc] = r.split(': ');
        let ruleObject = {
            ruleDesc,
        }
        dictRules[ruleNumber] = ruleDesc;
    });
}

function computeRule(data){
    let ruleIndex = 0;
    let currentData = data;
    let checkpoint = [];
    let evaluating = [];
    // Init
    if(dictRules[ruleIndex].split('|').length > 1) {
        let [first, second] = ruleDesc.split('|');
        first = first.match(/\d+/g);
        second = second.match(/\d+/g);
        evaluating.unshift(...first);
        checkpoint.push({data: [...currentData], rule:[...second]});
    } else {
        let rules = dictRules[ruleIndex].match(/\d+/g);
        evaluating.unshift(...rules);
    }
    // End init
    while(true) {
        if(!evaluating.length && !currentData.length) {
            return true;
        }
        if(!evaluating.length) {
            if(!checkpoint.length) {return false}
                currentData = checkpoint[0].data;
                evaluating = checkpoint[0].rule;
                checkpoint.shift();
        }
        let currentRule = dictRules[evaluating[0]];
        evaluating.shift();
        if(currentRule === "\"a\"" || currentRule === "\"b\"") {
            if(currentData[0] === currentRule.replace(/\"/g,'')) {
                currentData = currentData.slice(1);
            } else {
                if(!checkpoint.length) {return false}
                currentData = checkpoint[0].data;
                evaluating = checkpoint[0].rule;
                checkpoint.shift();
            }
    } else {
        if(currentRule.split('|').length > 1) {
            let [first, second] = currentRule.split('|');
            first = first.match(/\d+/g);
            second = second.match(/\d+/g);
            checkpoint.push({data: [...currentData], rule: [...second, ... evaluating]});
            evaluating.unshift(...first);
        } else {
            let rules = currentRule.match(/\d+/g);
            evaluating.unshift(...rules);
        }
    }
}
}

function checkData() {
    let correctRule = 0;
    let input = data.split(/\n/g);
    input.forEach((d) => {
        let dataS = d.split('');
        let result = computeRule(dataS);
        if(result) correctRule++;
    });
    console.log('Correct rule: ', correctRule);
}

registerAllRules();
checkData();
