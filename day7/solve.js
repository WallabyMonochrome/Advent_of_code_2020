const fs = require('fs');

let input = [];
input = fs.readFileSync('input.txt', 'utf8').split('.\n');

function removeLastSpace (name) {
    return name.substring(0, name.length -1);
}

// Bag format: {
//   name: 'dark olive',
//   contents: {
//     'faded blue': { name: 'faded blue', number: '3' },
//     'dotted black': { name: 'dotted black', number: '4' }
//   }
// }

//Format bag from input file
function getBagContent(bag) {
    const [container, listReceiver] = bag.replace(/\.|bags|bag/g, '').split(' contain ');
    const receivers = listReceiver === 'no other ' ? [] : listReceiver.split(', ');
    let containedBags = {};
    receivers.forEach(r => {
        let cBag = {};
        let splitReceiver = r.split(/\d+ /g)[1];
        cBag.name = removeLastSpace(splitReceiver); // Remove last whitespace
        cBag.number = r.match(/\d+/g)[0];
        containedBags[cBag.name] = cBag;
    });
    return {name: removeLastSpace(container), contents: containedBags};
}

//Recursion Part 1
function checkBagsContent(allBags, bag) {
    if(!bag) return false;
    for(let name in bag) {
       if(name === 'shiny gold') return true;
       let foundInBag = checkBagsContent(allBags, allBags[name]);
       if(foundInBag) return true;
    }
    return false;   
}

//Solution part 1
function checkAllBags(allBags) {
    let foundInBag = 0;
    Object.keys(allBags).forEach(b => {
        if(checkBagsContent(allBags, allBags[b])) foundInBag ++;
    });
    return foundInBag;
}

//Calcul all bag contained in the shiny (Recursion part 2)
function howManyBagInShiny(allBags, bag) {
    if(Object.keys(bag).length === 0) return 0;
    sum = 0;
    for(let name in bag) {
        sum += parseInt(bag[name].number, 10) + parseInt(bag[name].number, 10) * howManyBagInShiny(allBags, allBags[name]);
    }
    return sum;
}

//Main function
function getAllBags() {
    const allBags = {};
    input.forEach(b => {
       let bag = getBagContent(b);
       allBags[bag.name] = bag.contents;
    });
    console.log('Part 1:', checkAllBags(allBags)); // PART 1
    console.log('Part 2:', howManyBagInShiny(allBags, allBags['shiny gold']))
}

getAllBags();