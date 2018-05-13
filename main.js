let cardsArr = [];
let cardClicksCounter = 0;
const cardWrapper = document.querySelector('.card-wrapper');
let emojiArr = [...'🍩🍩🍰🍰🍭🍭🍦🍦🍪🍪🍮🍮🎂🎂🥧🥧'];
let gameMovesCounter = 0;
let matchingCards = [];
const playerMoves = document.getElementById('playerMoves');
const playerMinutes = document.getElementById('playerMinutes');
const playerSeconds = document.getElementById('playerSeconds');
let tempOpenCards = [];
let timer;
let seconds = 0;
let minutes = 0;
let starArr = [...'⭐⭐⭐'];
const playerStars = document.getElementById('playerStars');
const restartButton = document.querySelectorAll('.restart-button');
const popUp = document.querySelector('.popup');
const popUpInfo = document.querySelector('.display-popup-info');

/*
Load Handler
1) Display JS-created cards with randomly shuffled emoji
2) Grab all created cards from the DOM, turn Nodelist into array
3) Call function add click handler to cards in DOM
4) Call functions to display initial player moves and star ratings
*/

window.addEventListener('load', () => {
  createAndDisplayCards(shuffle(emojiArr));
  cardsArr = Array.from(document.querySelectorAll('.card'));
  addClickListenerToCards(cardsArr);
  displayPlayerMoves(true);
  displayAndChangeStarRating();
});

/*
Shuffle
1) Randomly shuffle the indexes of emojiArr
2) Credit http://stackoverflow.com/a/2450976
*/

const shuffle = array => {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

/*
1) Display JS-created cards with randomly shuffled emojiArr
1a) Invoked by load handler
*/

const createAndDisplayCards = shuffledEmojiArr => {
  for (let i = 0; i < emojiArr.length; i++) {
    const cardDiv = document.createElement('div');
    const cardFront = document.createElement('div');
    const cardBack = document.createElement('div');
    cardDiv.className = 'card';
    cardFront.className = 'card-front';
    cardBack.className = 'card-back';
    cardBack.innerText = `${shuffledEmojiArr[i]}`;
    cardDiv.append(cardFront, cardBack);
    cardWrapper.append(cardDiv);
  }
};

/*
1) Reassign random emoji to inner text of cards
1a) This function is called when the user restarts the game
*/

const reassignEmojiToCards = shuffledEmojiArr => {
  const cardBack = Array.from(document.querySelectorAll('.card-back'));
  cardBack.forEach((card, i) => {
    card.innerText = `${shuffledEmojiArr[i]}`;
  });
};

/*
Click Handler
1) Add click handler to each of the card elements
2) Keep count of how many cards the user has clicked
2) Begin the timer when the user clicks on one card - gameMovesCounter is incremented 
 when cards are matched in later functions
3) Flip and reset cards back if a user clicks multiple times on 1 card, and the matching
  cards array doesn't contain the emoji of the current card clicked
4) Keep count of card clicks so that users can't exceed
more than 2 card flips until the cardClicksCounter is reset 
when cards do or don't match
*/

const addClickListenerToCards = cardsArr => {
  cardsArr.forEach((card, i) => {
    card.addEventListener('click', () => {
      cardClicksCounter++;
      gameMovesCounter === 1 ? beginGameTimer() : null;
      displayAndChangeStarRating();
      if (card.classList.contains('flip-card') && !matchingCards.includes(card.innerText)) {
        cardsDontMatch();
      } else {
        cardClicksCounter <= 2 ? revealCardBack(card) : null;
      }
    }, false);
  });
};

/*
1) Add a transition class to reveal emoji
2) Pass revealed card to function to keep
  track of which cards have been clicked on
*/
const revealCardBack = card => {
  card.classList.add('flip-card');
  addOpenCardstoTempArr(card);
};

/*
1) Check if card has flip class and is included already in the matching cards array. If it does,
don't keep counting, if it doesn't match, keep counting the player moves.
  a) We do this so if a user clicks on an already paired match, it won't increase their player moves
2) Add emojis from clicked cards into a temp array of open cards
  a) This will allow us to compare 1 set of current and previous clicked cards at a time
3) Make sure two cards have been clicked and compare if they match
*/

const addOpenCardstoTempArr = card => {
  if (card.classList.contains('flip-card') && matchingCards.includes(card.innerText)) {
    displayPlayerMoves(false);
    resetCardClicks();
  } else {
    displayPlayerMoves(true);
  }
  tempOpenCards.push(card.innerText);
  tempOpenCards.length === 2 ? doCardsMatch(card) : null;
};

/* Depending if a true or false parameter is passed, will determine if the player
moves counter will keep counting and display to the user */

const displayPlayerMoves = keepCounting => {
  keepCounting ? (playerMoves.textContent = `${gameMovesCounter++}`) : null;
};


// Compare previous card clicked [0] and current card clicked [1]

const doCardsMatch = card => {
  tempOpenCards[0] === tempOpenCards[1] ? cardsDoMatch() : cardsDontMatch();
};


/*
1) Check if the matchingCards ALREADY has the emoji with the current card
user has clicked on.

If the matchingCards doesn't contain the current clicked card emoji, 
add the current and previous matched emojis set to the matchingCards

We do this to make sure if a user clicks multiple times on a matched card set
we do not keep adding them to the matchingCards array.
*/

const cardsDoMatch = () => {
  matchingCards.includes(tempOpenCards[1]) ? null : matchingCards.push(tempOpenCards[0], tempOpenCards[1]);
  resetCardClicks();
  clearTempArr();
  matchingCards.length === emojiArr.length ? gameWon() : null;
};

/*
1) Clear temporary values set of previous and current cards
2) Set timeout to remove classes from non-matching cards that do not have matching emojis
in the matchingCards array
*/
const cardsDontMatch = () => {
  clearTempArr();
  displayPlayerMoves(false);
  setTimeout(() => {
    removeCardFlipClass();
  }, 1000);
  resetCardClicks();
};


const removeCardFlipClass = () => {
  cardsArr.forEach((card, i) => {
    !matchingCards.includes(card.innerText) ? card.classList.remove('flip-card') : null;
  });
};

const displayAndChangeStarRating = () => {
  if (gameMovesCounter === 32) {
    starArr.pop();
  } else if (gameMovesCounter === 64) {
    starArr.pop();
  }
  playerStars.innerText = `${starArr.join('')}`;
};


const beginGameTimer = () => {
  timer = setInterval(() => {
    if (seconds % 60 === 0 && seconds !== 0) {
      minutes++;
      minutes > 9 ? (playerMinutes.innerText = minutes) : (playerMinutes.innerText = '0' + minutes);
      seconds = 0;
    }
    seconds > 9 ? (playerSeconds.innerText = seconds++) : (playerSeconds.innerText = '0' + seconds++);
  }, 1000);
};

const resetGameTimer = () => {
  clearInterval(timer);
  seconds = 0;
  minutes = 0;
  playerMinutes.innerText = '00';
  playerSeconds.innerText = '00';
};


const gameWon = () => {
  clearInterval(timer);
  popUp.classList.add('show-popup');
  popUpInfo.innerText = `it took ${playerMinutes.innerText} minutes and ${playerSeconds.innerText} seconds, with a star rating of ${starArr.join('')}`;
};

// Resets cardClicksCounter after 1s, we do this so we only keep track of up to 2 clicks

const resetCardClicks = () => {
  setTimeout(() => {
    cardClicksCounter = 0;
  }, 1000);
};

// Clear array so we can just compare 2 values: previous and current clicks

const clearTempArr = () => {
  tempOpenCards = [];
};


restartButton.forEach(button => {
  button.addEventListener('click', () => {
    resetGame();
  });
});

// reset the game board, the timer, and the star rating
const resetGame = () => {
  popUp.classList.contains('show-popup') ? popUp.classList.remove('show-popup') : null;

  playerStars.innerText = `${[...'⭐⭐⭐'].join('')}`;
  resetGameTimer();
  reassignEmojiToCards(shuffle(emojiArr));
  gameMovesCounter = 0;
  playerMoves.textContent = `${gameMovesCounter}`;
  matchingCards = [];
  clearTempArr();
  resetCardClicks();
  removeCardFlipClass();
  displayPlayerMoves(true);
};

