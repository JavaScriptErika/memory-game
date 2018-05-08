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
    // console.log(copy[i] === card.innerText);
    // copy.push(card.innerText);
    // console.log(card.innerText);
    // console.log(card.innerText == copy[i]);
    // card.classList.add('flip-card');
    // if (copy[i] !== card.innerText) {
    //   alert('true');
    // }
    // getIndex1 = i;
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

    // console.log(copy[`${getIndex1}`] === card.innerText, copy[`${getIndex2}`] === card.innerText);

    if (copy[`${getIndex1}`] === card.innerText && copy[`${getIndex2}`] !== card.innerText) {
      alert('no');
      myArray[`${getIndex1}`].classList.remove('flip-card');
      myArray[`${getIndex2}`].classList.remove('flip-card');
    }

    // console.log(getIndex1, getIndex2);
  });
});

// console.log(copy);
// for (let i; i < copy.length; i++) {
//   if (copy[0] === copy[1]) {
//     alert('true!');
//   }
// }
