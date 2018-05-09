const cardsArr = Array.from(document.querySelectorAll('.card'));

let emojiArr = [];
let clickCounter = 0;
let indexEvenClick = 0;
let indexOddClick = 0;

let assignClicksToIndex = i => {
  clickCounter % 2 === 0 ? (indexEvenClick = i) : (indexOddClick = i);
};

cardsArr.forEach((card, i) => {
  emojiArr.push(card.innerText);

  card.addEventListener('click', () => {
    clickCounter++;
    card.classList.add('flip-card');

    assignClicksToIndex(i);

    if (emojiArr[`${indexEvenClick}`] === card.innerText && emojiArr[`${indexOddClick}`] !== card.innerText) {
      setTimeout(() => {
        card.classList.remove('flip-card');
        cardsArr[`${indexOddClick}`].classList.remove('flip-card');
      }, 800);
    }
  });
});
