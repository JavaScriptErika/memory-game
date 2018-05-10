let cardsArr = [];
let cardClicksCounter = 0;
const cardWrapper = document.querySelector(".card-wrapper");
let emojiArr = [..."🍩🍩🍰🍰🍭🍭🍦🍦🍪🍪🍮🍮🎂🎂🥧🥧"];
let gameMovesCounter = 0;
let matchingCards = [];
const playerMoves = document.getElementById("playerMoves")
const playerTimer = document.getElementById("playerTimer")
let tempOpenCards = [];

/*
Display JS-created cards with randomly shuffled emojiArr
Invoked by load handler
*/

const displayCards = () => {
  for (let i = 0; i < 16; i++) {
    const cardDiv = document.createElement("div");
    const cardFront = document.createElement("div");
    const cardBack = document.createElement("div");

    cardDiv.className = "card";
    cardFront.className = "card-front";
    cardBack.className = "card-back";

    cardBack.innerText = `${emojiArr[i]}`;

    cardDiv.append(cardFront, cardBack);
    cardWrapper.append(cardDiv);
  }
}

/*
Shuffle
1) Randomly shuffle the indexes of emojiArr
2) Credit http://stackoverflow.com/a/2450976
*/
const shuffle = (array) => {

  let currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

/*
Click Handler
1) Add click handler to each of the card elements
2) Keep count of games moves
3) Keep count of card clicks so that users can't exceed
more than 2 card flips until the cardClicksCounter is reset 
when cards do or don't match
*/

const addClickListenerToCards = (cardsArr) => {
  cardsArr.forEach((card, i) => {
    card.addEventListener("click", () => {
      displayPlayerMoves();
      cardClicksCounter++

      cardClicksCounter <= 2 ? revealCardBack(card) : null;
    }, false);
  });
}

const displayPlayerMoves = () => {
  // gameMovesCounter++;
  playerMoves.textContent = `${gameMovesCounter++}`
}

/*
1) Add a transition class to reveal emoji
2) Pass revealed card to function to keep
  track of which cards have been clicked on
*/
const revealCardBack = (card) => {
  card.classList.add("flip-card");
  addOpenCardstoTempArr(card)
}


/*
1) Add emojis from clicked cards into a temp array of open cards
  a) This will allow us to compare 1 set of current and previous clicked cards at a time
2) Make sure two cards have been clicked and compare if they match
*/
const addOpenCardstoTempArr = (card) => {
  tempOpenCards.push(card.innerText)
  tempOpenCards.length === 2 ? doCardsMatch(card) : null;
}

// Resets cardClicksCounter after 1s
const resetCardClicks = () => {
  setTimeout(() => {
    cardClicksCounter = 0;
  }, 1000)
}

/*
1) Compare previous card clicked [0] and current card clicked [1]
*/
const doCardsMatch = (card) => {
  tempOpenCards[0] === tempOpenCards[1] ? cardsDoMatch() : cardsDontMatch(card)
}

/*
1) Check if the matchingCards ALREADY has the emoji with the current card
user has clicked on.

If the matchingCards doesn't contain the current clicked card emoji, 
add the current and previous matched emojis set to the list.

We do this to make sure if a user clicks multiple times on a matched card set
we do not keep adding them to the matchingCards array.
*/
const cardsDoMatch = () => {
  matchingCards.includes(tempOpenCards[1]) ? null : matchingCards.push(tempOpenCards[0], tempOpenCards[1]);
  console.log(matchingCards)
  resetCardClicks();

  clearTempArr()
}

/*
 1) Clear array so we can just compare 2 values: previous and current clicks
*/
const clearTempArr = () => {
  tempOpenCards = []
}


/*
1) Clear temporary values set of previous and current cards
2) Set timeout to remove classes from non-matching cards that do not have matching emojis
in the matchingCards array
  a) We do this so if a user clicks on a card that is already a matched set and a card
  that doesn't match, only the unmatched card gets its flip-card class removed, and the matched set is
  not affected.
*/
const cardsDontMatch = (card) => {
  clearTempArr()
  setTimeout(() => {
    cardsArr.forEach((card) => {
      if (!matchingCards.includes(card.innerText)) {
        card.classList.remove('flip-card');
      }
    })
  }, 1000);
  resetCardClicks();
}

/*
Load Handler
1) Call function to randomly shuffle the indexes of the emoji array
2) Display JS-created cards with randomly shuffled emoji
3) Grab all cards from the DOM, turn Nodelist into array
4) Call function add click handler to cards in DOM
*/
window.addEventListener("load", () => {
  shuffle(emojiArr);
  displayCards();
  cardsArr = Array.from(document.querySelectorAll(".card"));
  addClickListenerToCards(cardsArr);
  displayPlayerMoves()
})