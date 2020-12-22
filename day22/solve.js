const fs = require('fs');
let [p1Deck, p2Deck] = fs.readFileSync('input.txt','utf8').split(/\n\n/g);
p1Deck = p1Deck.split(/\n/g);
p2Deck = p2Deck.split(/\n/g);
p1Deck.shift();
p2Deck.shift();

// Part 1
function playCard(p1Deck, p2Deck, round) {
    if(!p1Deck.length || !p2Deck.length) {
        return p1Deck.length ? {deck: p1Deck} : {deck: p2Deck};
    }
    let p1Card = p1Deck.shift();
    let p2Card = p2Deck.shift();
    if(parseInt(p1Card) > parseInt(p2Card)) p1Deck.push(p1Card, p2Card) 
    else p2Deck.push(p2Card, p1Card);
    return playCard(p1Deck,p2Deck, round + 1);
}

//Part 2
function playCardRecursive(p1Deck, p2Deck, round, p1PlayedDecks, p2PlayedDecks) {
    if(!p1Deck.length || !p2Deck.length) {
        if(p1Deck.length) return {winner: 'p1', deck: p1Deck};
        if(p2Deck.length) return {winner: 'p2', deck: p2Deck};
    }
        if(p1PlayedDecks.some((e) => JSON.stringify(p1Deck) === e) && p2PlayedDecks.some((e) => JSON.stringify(p2Deck) === e)) {
            return {winner: 'p1', deck: p1Deck};
        }
        //Add to history
        p1PlayedDecks.push(JSON.stringify(p1Deck));
        p2PlayedDecks.push(JSON.stringify(p2Deck));
        ///
    let p1Card = p1Deck.shift();
    let p2Card = p2Deck.shift();
    if(parseInt(p1Card) <= p1Deck.length && parseInt(p2Card) <= p2Deck.length) {
        let subRoundWinner = playCardRecursive(
            [...p1Deck].slice(0,parseInt(p1Card)),
            [...p2Deck].slice(0,parseInt(p2Card)),
            round,
            [],
            []
        );
        if(subRoundWinner.winner === 'p1') p1Deck.push(p1Card, p2Card)
        if(subRoundWinner.winner === 'p2') p2Deck.push(p2Card, p1Card)
    } else {
        if(parseInt(p1Card) > parseInt(p2Card)) p1Deck.push(p1Card, p2Card) 
        else p2Deck.push(p2Card, p1Card);
    }
    return playCardRecursive(p1Deck,p2Deck, round + 1, p1PlayedDecks, p2PlayedDecks);
}

// const winning = playCard([...p1Deck], [...p2Deck], 0); //PART 1
const winning = playCardRecursive([...p1Deck], [...p2Deck], 0, [], []); // PART 2
let winningScore = winning.deck.reduce((acc, value, index) => {
    return acc += parseInt(value, 10) * (winning.deck.length - index)
}, 0);

console.log('Le winner:', winningScore);

