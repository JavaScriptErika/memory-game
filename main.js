const cardsArr = Array.from(document.querySelectorAll('.card'));

let emojiArr = [];
let clickCounter = 0;
let indexOddClick = 0;

(() => {
  cardsArr.forEach((card, i) => {
    emojiArr.push(card.innerText);

    card.addEventListener('click', () => {
      clickCounter++;
      card.classList.add('flip-card');

      assignClicksToIndex(i);
      ifCardsDontMatch(card);
    });
  });
})();

const assignClicksToIndex = i => (clickCounter % 2 === 0 ? null : (indexOddClick = i));

const ifCardsDontMatch = card => {
  console.log(indexOddClick);
  if (emojiArr[`${indexOddClick}`] !== card.innerText) {
    setTimeout(() => {
      card.classList.remove('flip-card');
      cardsArr[`${indexOddClick}`].classList.remove('flip-card');
    }, 800);
  }
};
