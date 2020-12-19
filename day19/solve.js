const fs = require('fs');

const [rules, data] = fs.readFileSync('input.txt', 'utf8').split(/\n\n/g);
// console.log(rules);
const dictRules = {};

function registerAllRules() {
    rules.split(/\n/g).forEach((r) =>{
       let [ruleNumber, ruleDesc] = r.split(': ');
        let ruleObject = {
            ruleDesc,
            matchRules: (data) => {
                // if(!data.length) return {sucess: true, data: []}
                // console.log('LEs data', data, ruleNumber);

                if(ruleDesc === "\"a\"" || ruleDesc === "\"b\"") {
                    if(data[0] === ruleDesc.replace(/\"/g,'')) {
                        return {sucess: true, data: data.slice(1)}
                    }
                        return {sucess: false};
                    }
                    if(ruleDesc.split('|').length > 1) {
                        let [first, second] = ruleDesc.split('|');
                        let dataBisFirst = data;
                        let isValidFirst = true;
                        first = first.match(/\d+/g)
                        first.forEach((r) => {
                            if(isValidFirst){
                                let result = dictRules[r].matchRules(dataBisFirst);
                                if(!result.sucess) isValidFirst = false;
                                dataBisFirst = result.data;
                            }
                        });

                // if(ruleNumber === '8' || ruleNumber === '41') {
                //     console.log('LEs data',isValidFirst,  data, ruleNumber);
                // }
                        // console.log('Loo',isValidFirst,  data, ruleNumber);
                        if(isValidFirst) return {sucess: true, data: dataBisFirst};
                        let isValidSecond = true;
                        let dataBisSecond = data;
                        second = second.match(/\d+/g)
                        second.forEach((r) => {
                            if(isValidSecond){
                                let result = dictRules[r].matchRules(dataBisSecond);
                                if(!result.sucess) isValidSecond = false;
                                dataBisSecond = result.data;
                            }
                        });
                        if(isValidSecond) return {sucess: true, data: dataBisSecond};
                        return {sucess: false};
                    }
                    let rules = ruleDesc.match(/\d+/g)
                    let dataBis = data;
                    let isValid = true;
                    rules.forEach((r) => {
                        if(isValid){
                            let result = dictRules[r].matchRules(dataBis);
                            if(!result.sucess) isValid = false;
                            dataBis = result.data;
                        }
                    });
                    if(isValid) return { sucess: true, data: dataBis};
                    return {sucess: false};
            }
        }
        dictRules[ruleNumber] = ruleObject;
    });
}

function checkData() {
    let correctRule = 0;
    let input = data.split(/\n/g);
    input.forEach((d) => {
        let dataS = d.split('');
        let result = dictRules[0].matchRules(dataS);
        console.log('Le result' , result);
        if(result.sucess && result.data.length > 0) result.sucess = false;
        if(result.sucess) correctRule++;
//        if(result.sucess) console.log('Data is correct: ', d);
    });
    console.log('Correct rule: ', correctRule);
}

registerAllRules();
checkData();
