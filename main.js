const body = document.querySelector('body');
let cardsArr = [];
let cardClicksCounter = 0;
let cardIndexes = [];
const cardWrapper = document.querySelector('.card-wrapper');
let emojiArr = [...'🍩🍩🍰🍰🍭🍭🍦🍦🍪🍪🍫🍫🍧🍧🥧🥧'];
let gameMovesCounter = 0;
const header = document.querySelector('header');
let matchingCards = [];
const playerMoves = document.getElementById('player-moves');
const playerMinutes = document.getElementById('player-minutes');
const playerSeconds = document.getElementById('player-seconds');
let tempOpenCards = [];
let timer;
let seconds = 0;
let minutes = 0;
let starArr = [...'⭐⭐⭐'];
const playerStars = document.getElementById('player-stars');
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
  body.classList.remove('preload');
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
Click Handler
1) Add click handler to each of the card elements
2) Keep count of how many cards the user has clicked
3) Begin the timer when the user clicks on one card - gameMovesCounter is incremented 
 when cards are matched in later functions
4) Flip and reset cards back if a user clicks multiple times on 1 card, and the matching
  cards array doesn't contain the emoji of the current card clicked
5) Keep count of card clicks so that users can't exceed
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
        cardsDontMatch(card);
      } else {
        cardClicksCounter <= 2 ? revealCardBack(card, i) : null;
      }
    }, false);
  });
};

/*
1) Add a transition class to reveal emoji

2) Pass revealed card to function to keep
  track of which cards have been clicked on
*/

const revealCardBack = (card, i) => {
  card.classList.add('flip-card');
  addOpenCardstoTempArr(card, i);
};

/*
1) Check if card has flip class and is included already in the matching cards array. If it does,
don't keep counting, if it doesn't match, keep counting the player moves.
a) We do this so if a user clicks on an already paired match, it won't increase their player moves

2) Add emojis from clicked cards into a temp array of open cards
a) This will allow us to compare 1 set of current and previous clicked cards at a time

3) Push the indexes of the card to cardIndexes, this will let us compare card
  indexes in the doCardsMatch function

4) Make sure two cards have been clicked and compare if they match
*/


const addOpenCardstoTempArr = (card, i) => {
  if (card.classList.contains('flip-card') && matchingCards.includes(card.innerText)) {
    displayPlayerMoves(false);
    resetCardClicks();
  } else {
    displayPlayerMoves(true);
  }
  tempOpenCards.push(card.innerText);
  cardIndexes.push(i);
  tempOpenCards.length === 2 ? doCardsMatch(card) : null;
};

/* Depending if a true or false parameter is passed, will determine if the player
moves counter will keep counting and display to the user */

const displayPlayerMoves = keepCounting => {
  keepCounting ? (playerMoves.textContent = `${gameMovesCounter++}`) : null;
};

/*
1) Compare previous card clicked emoji [0] and current card clicked emoji [1]
2) Compare the card indexes, if a user clicks on the same card twice (same index), we don't
want that to be considered a match - we do this extra comparison since the innerText emoji does
match when the same card is clicked twice for tempOpenCards, and it would cause a bug without cardIndexes
*/

const doCardsMatch = card => {
  tempOpenCards[0] === tempOpenCards[1] && (cardIndexes[0] != cardIndexes[1]) ? cardsDoMatch(card) : cardsDontMatch(card);
};

/*
1) Check if the matchingCards ALREADY has the emoji with the current card
user has clicked on.

If the matchingCards doesn't contain the current clicked card emoji, 
add the current and previous matched emojis set to the matchingCards

We do this to make sure if a user clicks multiple times on a matched card set
we do not keep adding them to the matchingCards array.
*/

const cardsDoMatch = card => {
  matchingCards.includes(tempOpenCards[1]) ? null : matchingCards.push(tempOpenCards[0], tempOpenCards[1]);
  cardsValidationAnimation(card);
  resetCardClicks();
  clearTempArr();
  cardIndexes = [];
  matchingCards.length === emojiArr.length ? gameWon() : null;
};

/*
1) Check if the cardback's parent card contains the class "flip-card", the matching cards array includes
the emoji array of current card clicked that has been passed down, and that there have been 2 selections

1a) We add two classes to the cards that match - we add card-back-match which changes the color the of 
flipped card, and we add an animation to the entire parent card too. We keep that validation until a user resets
the game.

2) If the card doesn't have a matching class and it is flipped, we add a color class to the cardback, and
an animation to the parent card.

2a) We remove these classes after 1 second so any invalid matches are reset for another guess.
 */

const cardsValidationAnimation = card => {
  const cardBacks = document.querySelectorAll('.card-back');
  cardBacks.forEach((cardback, i) => {
    if (cardback.closest('.flip-card') && matchingCards.includes(cardback.innerText) && tempOpenCards.length === 2) {

      setTimeout(() => {
        cardback.classList.add('card-back-match');
        cardback.closest('.flip-card').classList.add('flip-card-valid-match');
      }, 500);

    } else if (cardback.closest('.flip-card') && !cardback.classList.contains('card-back-match')) {

      setTimeout(() => {
        cardback.classList.add('card-back-mismatch');
        cardback.closest('.flip-card').classList.add('flip-card-invalid-match');
      }, 200);

      setTimeout(() => {
        cardback.classList.remove('card-back-mismatch');
        cardback.closest('.flip-card').classList.remove('flip-card-invalid-match');
      }, 900);
    }
  });
};


const cardsDontMatch = card => {
  cardsValidationAnimation(card);
  clearTempArr();
  displayPlayerMoves(false);
  setTimeout(() => {
    removeCardFlipClass();
  }, 1000);
  resetCardClicks();
  clearCardIndexesArr();
};

// 1) Remove flip-card class from non-matching cards that do not include matching emojis in the matchingCards array
const removeCardFlipClass = () => {
  cardsArr.forEach((card) => {
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

const gameWon = () => {
  clearInterval(timer);
  showPopupAndFade();
  popUpInfo.innerHTML = `<div class="pop-up-timer">⏰ ${playerMinutes.innerText} : ${playerSeconds.innerText}</div>
                          <div class="pop-up-rating"> ${playerStars.innerText}</div >`;
};

const showPopupAndFade = () => {
  popUp.classList.add('display-popup');
  header.classList.add('fade-background');
  cardWrapper.classList.add('fade-background');
};

restartButton.forEach(button => {
  button.addEventListener('click', () => {
    resetGame();
  });
});

const resetGame = () => {
  popUp.classList.contains('display-popup') ? removePopupAndFade() : null;
  resetGameWithoutPlaying();
  resetStars();
  resetGameTimer();
  resetGameCounter();
  matchingCards = [];
  clearTempArr();
  resetCardClicks();
  removeCardFlipClass();
  removeCardMatchAnimation();
  clearCardIndexesArr();
  displayPlayerMoves(true);
};

const removePopupAndFade = () => {
  popUp.classList.remove('display-popup');
  header.classList.remove('fade-background');
  cardWrapper.classList.remove('fade-background');
};

/*
What if the user keeps clicking the "restart" button without actually playing the game?
This allows me to call a function to shuffle the cards without a transition end call
or the function to reassign the emoji after animation.

Without this function, bugs happen! If a user clicks endlessly on the restart button,
and then clicks a card, the previous emoji would glitch. Then, if I didn't add a transition end 
 when a card IS clicked and user refreshes, the reshuffled emoji would briefly appear during the card flip.
*/
const resetGameWithoutPlaying = () => {
  removeCardMatchAnimation();

  const areCardsFlippedOver = cardsArr.filter(card => {
    return card.classList.contains('flip-card');
  });

  areCardsFlippedOver.length === 0
    ? reassignEmojiToCards(shuffle(emojiArr))
    : ReassignEmojiAfterAnimation(shuffle(emojiArr));
};

const ReassignEmojiAfterAnimation = shuffledEmojiArr => {
  cardsArr.forEach((card, i) => {
    card.addEventListener('transitionend', () => {
      reassignEmojiToCards(shuffledEmojiArr);
    });
  });
};

const reassignEmojiToCards = shuffledEmojiArr => {
  const cardBacks = document.querySelectorAll('.card-back');
  cardBacks.forEach((cardback, i) => {
    cardback.innerText = `${shuffledEmojiArr[i]}`;
  });
};

const resetStars = () => {
  starArr = [...'⭐⭐⭐'];
  playerStars.innerText = `${starArr.join('')}`;
};

const resetGameTimer = () => {
  clearInterval(timer);
  seconds = 0;
  minutes = 0;
  playerMinutes.innerText = '00';
  playerSeconds.innerText = '00';
};

const resetGameCounter = () => {
  gameMovesCounter = 0;
  playerMoves.textContent = `${gameMovesCounter}`;
};

const removeCardMatchAnimation = () => {
  const cardBacks = document.querySelectorAll('.card-back');
  cardBacks.forEach(cardback => {
    cardback.classList.remove('card-back-match');
  });

  cardsArr.forEach(card => {
    card.classList.remove('flip-card-valid-match');
  });
};

// Resets cardClicksCounter after 1s, we do this so we only keep track of up to 2 clicks

const resetCardClicks = () => {
  setTimeout(() => {
    cardClicksCounter = 0;
  }, 1000);
};

// Clear array so we can just compare 2 values: previous and current clicks

const clearTempArr = () => (tempOpenCards = []);

// Clear array so we can just compare previous and current card index
const clearCardIndexesArr = () => (cardIndexes = []);