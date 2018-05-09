const cardsArr = Array.from(document.querySelectorAll('.card'));

let emojiArr = [];
let clickCounter = 0;
let indexFromClick = 0;

/*
IIFEE
1) Loop through card array and add its emoji to a new array, emojiArr

Click Handler
1) Add click handler to each of the card elements
2) Keep count of times card is clicked,
3) Add class to reveal back of card aka emoji
*/

cardsArr.forEach((card, i) => {
  emojiArr.push(card.innerText);

  card.addEventListener('click', () => {
    clickCounter++;
    card.classList.add('flip-card');

    trackClicksAssignIndex(i);
    ifCardsDontMatch(card);
  });
});

// First user click and every other user click will be assigned that corresponding index of card

const trackClicksAssignIndex = i => (clickCounter % 2 === 0 ? null : (indexFromClick = i));

// Compare the value of the emojiArr via index to card currently clicked from the event handler

const ifCardsDontMatch = card => {
  if (emojiArr[`${indexFromClick}`] !== card.innerText) {
    setTimeout(() => {
      card.classList.remove('flip-card');
      cardsArr[`${indexFromClick}`].classList.remove('flip-card');
    }, 800);
  }
};
