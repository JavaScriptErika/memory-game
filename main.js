let clickCounter = 0;
let indexFromClick = 0;
let tempOpenCards = [];
let matchingCards = [];
let cardsArr = [];
let cardWrapper = document.querySelector(".card-wrapper");
let emojiArr = [...'🍩🍩🍰🍰🍭🍭🍦🍦🍪🍪🍮🍮🎂🎂🥧🥧'];

// Create dynamic HTML divs with classes to display cards
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
1) Randomly shuffle the indexes of the emoji array when called
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
2) Keep count of times card is clicked to get prev card click based on index
3) Add class to reveal back of card aka emoji
*/

const addClickListenerToCards = (cardsArr) => {
  cardsArr.forEach((card, i) => {
    card.addEventListener("click", () => {
      clickCounter++;
      revealCardBack(card)
      trackClicksAssignIndex(i);
    }, false);
  });
}

const revealCardBack = (card) => {
  card.classList.add("flip-card");
  addOpenCardstoArr(card)
}

const addOpenCardstoArr = (card) => {
  tempOpenCards.push(card.innerText)
  tempOpenCards.length >= 2 ? doCardsMatch(card) : null;
}

const doCardsMatch = (card) => {

  card.innerText === tempOpenCards[0] ? cardsMatch(card) : cardsDontMatch(card)

}

const cardsMatch = (card) => {
  matchingCards[matchingCards.length - 1] != card.innerText ? matchingCards.push(tempOpenCards[0], card.innerText) : null;
  alert("hi")
  console.log(matchingCards)
  clearTempArr()
}

const clearTempArr = () => {
  tempOpenCards.length >= 2 ? tempOpenCards.splice(-1, 2) : null
  tempOpenCards.length === 1 ? tempOpenCards.splice(-1, 1) : null
}

const cardsDontMatch = (card) => {
  if (tempOpenCards.length != 1) {
    setTimeout(() => {
      card.classList.remove('flip-card');
      cardsArr[indexFromClick].classList.remove('flip-card');
    }, 1000);
    clearTempArr()
    console.log(tempOpenCards)
  }
}
// First user click and every other user click will be assigned that corresponding index of card
const trackClicksAssignIndex = i => (clickCounter % 2 === 0 ? null : (indexFromClick = i));


/*
Load Handler
1) Call function to randomly shuffle the indexes of the emoji array
2) Display cards with randomly shuffled emoji
3) Grab all cards from the DOM, turn Nodelist into array
4) Call function add click handler to cards in DOM
*/
window.addEventListener("load", () => {
  shuffle(emojiArr);
  displayCards();
  cardsArr = Array.from(document.querySelectorAll(".card"));
  addClickListenerToCards(cardsArr);
})