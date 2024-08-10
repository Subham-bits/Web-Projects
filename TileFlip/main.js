const boxes = document.querySelectorAll('.box');
const sound = document.getElementById('buttonSound');
const errorSound = document.getElementById('errorSound');
const winSound = document.getElementById('winSound');
const winner = document.getElementById('winner');
const title = document.querySelector('.contain')

title.addEventListener("click",function(){location.reload()})


boxes.forEach((box) => box.addEventListener('click', runEvent));

const guesses = document.querySelector('#guess')
let matchedParis = 0;

function runEvent(e) {
    e.preventDefault()
    sound.play()
    if (e.target.classList.contains('show')) {
        e.target.classList.remove('show')
    } else {
        e.target.classList.add('show')
    }
}

const count = 36
const min = 1
const max = 37
const distinctNumbers = generateDistinctRandomNumbers(count, min, max).sort()

function generateDistinctRandomNumbers(count, min, max) {
    if (max - min + 1 < count) {
        throw new Error(
            'Range is too small to generate the required number of distinct numbers'
        )
    }

    const numbers = new Set()

    while (numbers.size < count) {
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min
        numbers.add(randomNumber)
    }

    return Array.from(numbers)
}

function distribute() {
    const pairs = []
    const size = 36
    const numberOfPairs = size / 2
    for (let i = 1; i <= numberOfPairs; i++) {
        pairs.push(i, i)
    }
    if (pairs.length !== size) {
        throw new Error('The number of pairs is not correct.')
    }
    for (let i = pairs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[pairs[i], pairs[j]] = [pairs[j], pairs[i]]
    }
    return pairs
}

const pairarr = distribute()
let guesscount = 0
function check(i, j, pairs) {
    if (pairs[i] === pairs[j]) {
        guesscount++;
		guesses.textContent = `Guess = ${guesscount}`;
        winSound.play();
        matchedParis++;
        if (matchedParis == 18) {
            setTimeout(() => {
            winner.play();    
            }, 300);
            
            setTimeout(() => {
                window.location.href = 'win.html'     
            }, 500);
            
        }
        return 1
    } else {
			guesscount++;
			guesses.textContent = `Guess = ${guesscount}`;
            errorSound.play();
        return 0
    }
}

const container = document.querySelector('.boxx')

container.addEventListener('click', returnIndex)

let firstCard = null
let secondCard = null

function returnIndex(a) {
    let clickedCard = a.target // Assuming `a.target` is the clicked card element
    let cardNumber = Number(clickedCard.textContent)

    // Check if the card is already flipped
    if (!clickedCard.classList.contains('show')) {
        return
    }
    // Check if the first card is already set
    if (!firstCard) {
        // Set the first card
        firstCard = { element: clickedCard, number: cardNumber }
    } else if (!secondCard) {
        // Check if the player clicked the same card twice
        if (firstCard.element === clickedCard) {

            return
        }
        // Set the second card
        secondCard = { element: clickedCard, number: cardNumber }

        let cheeck = check(firstCard.number, secondCard.number, pairarr)

        if (cheeck) {
            firstCard = null
            secondCard = null
        } else {
            setTimeout(() => {
                firstCard.element.classList.remove('show')
                secondCard.element.classList.remove('show')
                firstCard = null
                secondCard = null
            }, 300)
        }
    }
}


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


function showRandom() {
    for (let i = 0; i <= 36; i++) {
        container.children[i].textContent = pairarr[i];
        container.children[i].style.backgroundImage = images[container.children[i].textContent];
    }
}

showRandom()
