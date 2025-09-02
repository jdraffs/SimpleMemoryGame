
const cards = [
    { value: 1, id: 1 }, { value: 1, id: 2 },
    { value: 2, id: 3 }, { value: 2, id: 4 },
    { value: 3, id: 5 }, { value: 3, id: 6 },
    { value: 4, id: 7 }, { value: 4, id: 8 },
    { value: 5, id: 9 }, { value: 5, id: 10 },
    { value: 6, id: 11 }, { value: 6, id: 12 },
];


function shuffle(cards) {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
}


shuffle(cards);

const gameBoard = document.getElementById('game-board');
const moveCountEl = document.getElementById('move-count');

let firstCard = null;
let secondCard = null;
let moves = 0;
let matches = 0;

function initializeGame() {
    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.value = card.value;
        cardElement.dataset.id = card.id;
        cardElement.innerText = ''; 
        cardElement.addEventListener('click', handleCardClick);
        gameBoard.appendChild(cardElement);
    });
}


function handleCardClick(e) {
    const clickedCard = e.target;

    if (clickedCard === firstCard || clickedCard.classList.contains('matched')) return;

    clickedCard.classList.add('flipped');
    clickedCard.innerText = clickedCard.dataset.value;

    if (!firstCard) {
        firstCard = clickedCard;
    } else {
        secondCard = clickedCard;
        moves++;
        moveCountEl.textContent = moves;
        checkMatch();
    }
}


function checkMatch() {
    if (firstCard.dataset.value === secondCard.dataset.value) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matches++;
        if (matches === cards.length / 2) {
            setTimeout(() => alert(`You won in ${moves} moves!`), 500);
        }
        resetSelection();
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.innerText = '';
            secondCard.innerText = '';
            resetSelection();
        }, 1000);
    }
}


function resetSelection() {
    firstCard = null;
    secondCard = null;
}


initializeGame();
