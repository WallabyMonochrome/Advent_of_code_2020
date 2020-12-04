const fs = require('fs');

let input = [];
input = fs.readFileSync('input.txt', 'utf8').split('\n\n');

const requiredField = ["byr", "iyr", "eyr","hgt","hcl","ecl","pid"];
const fieldWithValidation = {
    byr: {
        min: 1920,
        max: 2002,
    }, 
    iyr: {
        min: 2010,
        max: 2020,
    }, 
    eyr: {
        min: 2020,
        max: 2030,
    },
    hgt: {
        cm: {
            min: 150,
            max: 193
        },
        in: {
            min: 56,
            max: 76,
        }
    },
    hcl: {
        regEx: /#([0-9]|[a-f]){6}$/,
    },
    ecl: {
        enum: ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'],
    },
    pid: {
        size: 9,
    },
    cid: {}
}

function validatePassport(passport) {
    let valid = true;
    Object.keys(passport).forEach(field => {
        if(field === 'hgt') {
            const unit = passport[field].substring(passport[field].length - 2);
            if( unit !== 'cm' && unit !== 'in') {
                valid = false;
                return;
            }
            const value = passport[field].substring(0, passport[field].length - 2);
            if(fieldWithValidation[field][unit].min > value || value > fieldWithValidation[field].max) {
                valid = false;
            }
        }
        if(fieldWithValidation[field].min) {
            if(fieldWithValidation[field].min > passport[field] || passport[field] > fieldWithValidation[field].max) {
                valid = false;
            }
        }
        if(fieldWithValidation[field].regEx) {
            valid = valid && !!passport[field].match(fieldWithValidation[field].regEx);
        }
        if(fieldWithValidation[field].enum) {
            valid = valid &&!!fieldWithValidation[field].enum.find((e) => e === passport[field]);
        }
        if(fieldWithValidation[field].size) {
            valid = valid && passport[field].length === fieldWithValidation[field].size;
        }
    });
    return valid;
}

function checkPassport(passport) {
    let valid = true;
    requiredField.forEach((f) => {
        if(!passport[f]) {
            valid = false;
        }
    });
    if(valid) {
        valid = validatePassport(passport);
    }
    if(valid) {
        console.log(passport.ecl);
    }
    return valid;
}


function checkAllPassport() {
    let validPassport = 0;
    input.forEach(l => {
        l = l.replace(/\n/g, ' ');
        const lineSplit = l.split(' ');
        const passport = {};
        lineSplit.forEach(elem => {
            const [name, value] = elem.split(':');
            passport[name] = value;
        });
        if(checkPassport(passport)) validPassport++;
    });
    return validPassport;
}

const validPassport = checkAllPassport();
console.log('All valid passport', validPassport);