let cardsArr = [];
let cardClicksCounter = 0;
const cardWrapper = document.querySelector(".card-wrapper");
let emojiArr = [..."🍩🍩🍰🍰🍭🍭🍦🍦🍪🍪🍮🍮🎂🎂🥧🥧"];
let gameMovesCounter = 0;
let matchingCards = [];
const playerMoves = document.getElementById("playerMoves")
const playerMinutes = document.getElementById("playerMinutes")
const playerSeconds = document.getElementById("playerSeconds")
let tempOpenCards = [];
let timer;
let seconds = 0;
let minutes = 0;
const starArr = [..."⭐⭐⭐"]
const playerStars = document.getElementById("playerStars")

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
  displayPlayerMoves(true)
  displayAndChangeStarRating()
})


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
Click Handler
1) Add click handler to each of the card elements
2) Keep count of games moves
3) Flip and reset cards back if a user clicks multiple times on 1 card, and the matching
  cards array doesn't contain the emoji of the current card clicked
4) Keep count of card clicks so that users can't exceed
more than 2 card flips until the cardClicksCounter is reset 
when cards do or don't match
*/

const addClickListenerToCards = (cardsArr) => {
  cardsArr.forEach((card, i) => {
    card.addEventListener("click", () => {

      cardClicksCounter++
      gameMovesCounter === 1 ? beginGameTimer() : null;

      displayAndChangeStarRating()

      if (card.classList.contains('flip-card') && !matchingCards.includes(card.innerText)) {
        cardsDontMatch()
      } else {
        cardClicksCounter <= 2 ? revealCardBack(card) : null;
      }
    }, false);
  });
}

// const displayStars = () => {
//   playerStars.innerText = `${starArr.join("")}`
// }

const displayAndChangeStarRating = () => {
  if (gameMovesCounter === 32) {
    starArr.pop()
  } else if (gameMovesCounter === 64) {
    starArr.pop()
  }

  playerStars.innerText = `${starArr.join("")}`

}

const beginGameTimer = () => {
  timer = setInterval(() => {

    if (seconds % 60 === 0 && seconds !== 0) {
      minutes++
      minutes > 9 ? playerMinutes.innerText = minutes : playerMinutes.innerText = "0" + minutes
      seconds = 0;
    }

    seconds > 9 ? playerSeconds.innerText = seconds++ : playerSeconds.innerText = "0" + seconds++
  }, 1000)
}

const displayPlayerMoves = (keepCounting) => {
  keepCounting ? playerMoves.textContent = `${gameMovesCounter++}` : null;
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


/* REMINDER TO LOOK THIS OVER
1) Check if card has flip class and is included already in the matching cards array. If it does,
don't keep counting, if it doesn't keep counting the player moves.
  a) We do this so if a user clicks on a paired match, it won't increase their player moves
2) Add emojis from clicked cards into a temp array of open cards
  a) This will allow us to compare 1 set of current and previous clicked cards at a time
3) Make sure two cards have been clicked and compare if they match
*/
const addOpenCardstoTempArr = (card) => {
  if (card.classList.contains('flip-card') && matchingCards.includes(card.innerText)) {
    displayPlayerMoves(false)
    resetCardClicks()
  } else {
    displayPlayerMoves(true)
  }

  tempOpenCards.push(card.innerText)
  tempOpenCards.length === 2 ? doCardsMatch(card) : null;
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

  resetCardClicks();
  clearTempArr()
}

// Resets cardClicksCounter after 1s
const resetCardClicks = () => {
  setTimeout(() => {
    cardClicksCounter = 0;
  }, 1000)
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
  displayPlayerMoves(false);
  setTimeout(() => {
    cardsArr.forEach((card) => {
      if (!matchingCards.includes(card.innerText)) {
        card.classList.remove('flip-card');
      }
    })
  }, 1000);
  resetCardClicks();
}






