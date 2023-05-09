const gameBoard = document.getElementById("game-board");
const cards = [
  "A", "A", "B", "B", "C", "C", "D", "D",
  "E", "E", "F", "F", "G", "G", "H", "H"
];
let openCards = [];
let matchedPairs = 0;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createCard(value) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.addEventListener("click", () => handleCardClick(card));

  const cardText = document.createElement("div");
  cardText.classList.add("card-text");
  cardText.textContent = value;
  card.appendChild(cardText);

  return card;
}

function handleCardClick(card) {
  if (openCards.length < 2 && !card.classList.contains("open")) {
    card.classList.add("open");
    openCards.push(card);
    if (openCards.length === 2) {
      checkMatch();
    }
  }
}

function checkMatch() {
  const [firstCard, secondCard] = openCards;
  if (firstCard.textContent === secondCard.textContent) {
    matchedPairs++;
    if (matchedPairs === cards.length / 2) {
      setTimeout(() => {
        alert("You've won!");
        location.reload();
      }, 500);
    }
  } else {
    setTimeout(() => {
      firstCard.classList.remove("open");
      secondCard.classList.remove("open");
    }, 1000);
  }
  openCards = [];
}

function initGame() {
  const shuffledCards = shuffle(cards);
  shuffledCards.forEach(cardValue => {
    const card = createCard(cardValue);
    gameBoard.appendChild(card);
  });
}

initGame();
