const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8').split(/\n/g);

const ingredientsBook = new Set();
const ingredientsAllergen = {};
const dishBook = [];
function listPotentialAllergen(dish) {
    let [ingredients, allergen] = dish.split(' (');
    //Clean
    allergen = allergen.replace('contains ', '');
    allergen = allergen.replace(')', '');
    allergen = allergen.split(', ');
    ingredients = ingredients.split(' ');
    ingredients.forEach((i) => ingredientsBook.add(i));
    dishBook.push([...ingredients]);
    allergen.forEach((a) => {
        if(!ingredientsAllergen[a]) {
            ingredientsAllergen[a] = [...ingredients];
        } else {
            ingredientsAllergen[a] = ingredientsAllergen[a].filter((i) => ingredients.some((ing) => i === ing));
        }
    });
}

function searchIngredientsNoAllergen() {
    let noAllergen = [];
    ingredientsBook.forEach((i) => {
        let hasAllergen = false;
        Object.keys(ingredientsAllergen).forEach((a) => {
            if (ingredientsAllergen[a].some((e) => e === i)) hasAllergen = true;
        });
        if (!hasAllergen) noAllergen.push(i);
    });
    return noAllergen;
}

function countIngredients(noAllergen){
    let count = 0;
    dishBook.forEach((d) => {
        noAllergen.forEach((i) => {
            if(d.some((e) => e === i)) count ++;
        });
    });
    return count;
}

function matchIngredientAllergen() {
    let ingredientsWithAllergen = {};
    let count = 0;
    while(Object.keys(ingredientsWithAllergen).length < Object.keys(ingredientsAllergen).length) {
        Object.keys(ingredientsAllergen).forEach((a) => {
            if(ingredientsAllergen[a].length === 1) {
                ingredientsWithAllergen[ingredientsAllergen[a].shift()] = a;
            }
            ingredientsAllergen[a] = ingredientsAllergen[a].filter((i) =>  !ingredientsWithAllergen[i]);
        });
        count ++;
    }
   return ingredientsWithAllergen;
}

function formatListDangerous(listDangerous) {
    let listSolution = listDangerous;
    let sorted = Object.keys(listSolution).sort((a, b) => {
        if(listSolution[a] < listSolution[b]) return -1;
        if(listSolution[a] > listSolution[b]) return 1;
        return 0;
    });
    console.log('Part 2 solution: ', JSON.stringify(sorted).replace(/\"/g, ''));
}

function run() {
    input.forEach((d) => {
        listPotentialAllergen(d);
    });
    let noAllergen = searchIngredientsNoAllergen();
    let nbIngredients = countIngredients(noAllergen);
    console.log('Part 1: ', nbIngredients);
    let listDangerous = matchIngredientAllergen();
    formatListDangerous(listDangerous);
}

run();