let clickCounter = 0;
let indexFromClick = 0;
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
  Shuffle function from http://stackoverflow.com/a/2450976
  1) Allows us to randomly shuffle the indexes of the emoji array when called
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

const addClickListenerToCards = (cardsArr) => {
  cardsArr.forEach((card, i) => {
    // emojiArr.push(card.innerText);
    card.addEventListener("click", () => {
      clickCounter++;
      card.classList.add("flip-card");
      // trackClicksAssignIndex(i);
      // ifCardsDontMatch(card);
    });
  });
}

window.addEventListener("load", () => {
  shuffle(emojiArr);
  displayCards();
  let cardsArr = document.querySelectorAll(".card");
  addClickListenerToCards(cardsArr);
})
/*
IIFEE
1) Loop through card array and add its emoji to a new array, emojiArr

Click Handler
1) Add click handler to each of the card elements
2) Keep count of times card is clicked,
3) Add class to reveal back of card aka emoji
*/


// First user click and every other user click will be assigned that corresponding index of card
// const trackClicksAssignIndex = i => (clickCounter % 2 === 0 ? null : (indexFromClick = i));

// Compare the value of the emojiArr via index to card currently clicked from the event handler
// const ifCardsDontMatch = card => {
//   if (emojiArr[`${indexFromClick}`] !== card.innerText) {
//     setTimeout(() => {
//       card.classList.remove('flip-card');
//       cardsArr[`${indexFromClick}`].classList.remove('flip-card');
//     }, 800);
//   }
// };
