// Element Selectors
const boxes = document.querySelectorAll('.box');
const sound = document.getElementById('buttonSound');
const errorSound = document.getElementById('errorSound');
const winSound = document.getElementById('winSound');
const winner = document.getElementById('winner');
const title = document.querySelector('.contain');
const guesses = document.querySelector('#guess');
const container = document.querySelector('.boxx');



// Variables
let matchedPairs = 0;
let guessCount = 0;
let firstCard = null;
let secondCard = null;

// Event Listeners
title.addEventListener("click", () => location.reload());
boxes.forEach((box) => box.addEventListener('click', runEvent));
container.addEventListener('click', returnIndex);

// Constants and Arrays

import { name1, name2 } from './login.js';
console.log(name1,name2);
console.log(name2);
const count = 36;
const min = 1;
const max = 37;
const distinctNumbers = generateDistinctRandomNumbers(count, min, max).sort();
const pairArr = distribute();
const images = {
    1: "url('files/images/avocado-svgrepo-com.svg')",
    2: "url('files/images/banana-svgrepo-com.svg')",
    3: "url('files/images/emoji-pumpkin-halloween-44-svgrepo-com.svg')",
    4: "url('files/images/carrot-svgrepo-com.svg')",
    5: "url('files/images/face-with-tongue-svgrepo-com.svg')",
    6: "url('files/images/fire-svgrepo-com.svg')",
    7: "url('files/images/fish-svgrepo-com.svg')",
    8: "url('files/images/star-svgrepo-com.svg')",
    9: "url('files/images/steak-svgrepo-com.svg')",
    10: "url('files/images/iphone-svgrepo-com.svg')",
    11: "url('files/images/grape-svgrepo-com.svg')",
    12: "url('files/images/heart-svgrepo-com.svg')",
    13: "url('files/images/genetic-data-svgrepo-com.svg')",
    14: "url('files/images/lla-svgrepo-com.svg')",
    15: "url('files/images/watermelon-svgrepo-com.svg')",
    16: "url('files/images/lemon-svgrepo-com.svg')",
    17: "url('files/images/present-svgrepo-com.svg')",
    18: "url('files/images/globe-2-svgrepo-com.svg')"
};

// Functions
function runEvent(e) {
    e.preventDefault();
    sound.play();
    e.target.classList.toggle('show');
}

function generateDistinctRandomNumbers(count, min, max) {
    if (max - min + 1 < count) {
        throw new Error('Range is too small to generate the required number of distinct numbers');
    }

    const numbers = new Set();

    while (numbers.size < count) {
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        numbers.add(randomNumber);
    }

    return Array.from(numbers);
}

function distribute() {
    const pairs = [];
    const size = 36;
    const numberOfPairs = size / 2;
    
    for (let i = 1; i <= numberOfPairs; i++) {
        pairs.push(i, i);
    }
    
    if (pairs.length !== size) {
        throw new Error('The number of pairs is not correct.');
    }
    
    for (let i = pairs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
    }
    
    return pairs;
}

function check(i, j, pairs) {
    if (pairs[i] === pairs[j]) {
        guessCount++;
        guesses.textContent = `Guess = ${guessCount}`;
        winSound.play();
        matchedPairs++;

        firstCard.element.classList.add('matched');
        secondCard.element.classList.add('matched');
        
        if (matchedPairs == 18) {
            setTimeout(() => winner.play(), 300);
            setTimeout(() => window.location.href = 'win.html', 500);
        }
        
        return 1;
    } else {
        guessCount++;
        guesses.textContent = `Guess = ${guessCount}`;
        errorSound.play();
        
        return 0;
    }
}

function returnIndex(a) {
    let clickedCard = a.target;
    let cardNumber = Number(clickedCard.textContent);

    if (!clickedCard.classList.contains('show') || clickedCard.classList.contains('matched')) { 
       return;
    }

    if (!firstCard) {
        firstCard = { element: clickedCard, number: cardNumber };
    } else if (!secondCard) {
        if (firstCard.element === clickedCard) {
            return;
        }
        
        secondCard = { element: clickedCard, number: cardNumber };
        let checkResult = check(firstCard.number, secondCard.number, pairArr);

        if (checkResult) {
            firstCard = null;
            secondCard = null;
        } else {
            setTimeout(() => {
                firstCard.element.classList.remove('show');
                secondCard.element.classList.remove('show');
                firstCard = null;
                secondCard = null;
            }, 300);
        }
    }
}

function showRandom() {
    for (let i = 0; i <= 36; i++) {
        container.children[i].textContent = pairArr[i];
        container.children[i].style.backgroundImage = images[container.children[i].textContent];
    }
}

// Initialize
showRandom();
