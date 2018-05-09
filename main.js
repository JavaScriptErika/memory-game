const cards = document.querySelectorAll('.card');
const myArray = Array.from(cards);

let copy = [];
let counter = 0;
let getIndex1 = 0;
let getIndex2 = 0;

Array.from(cards).forEach((card, i) => {
  copy.push(card.innerText);

  card.addEventListener('click', () => {
    counter++;

    card.classList.add('flip-card');

    if (counter % 2 === 0) {
      getIndex1 = i;
    } else {
      getIndex2 = i;
    }

    console.log(
      '2 clicks',
      copy[`${getIndex1}`],
      'inner card',
      card.innerText,
      'odd click',
      copy[`${getIndex2}`],
      'inner card',
      card.innerText
    );
    console.log(copy[`${getIndex1}`] !== card.innerText);

    if (copy[`${getIndex1}`] === card.innerText && copy[`${getIndex2}`] !== card.innerText) {
      setTimeout(() => {
        card.classList.remove('flip-card');
        myArray[`${getIndex2}`].classList.remove('flip-card');
      }, 800);
    }
  });
});
