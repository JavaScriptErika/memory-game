# 📇🧠 Udacity Memory Game Challenge 🧠📇

#### 👉 Udacity's Memory Game Project is a part of the Front-End degree curriculum program. 

This project is completed _without_ starter code from Udacity's program.

### How to Play

The game consists of 16 cards with a hidden emoji symbol on the back. Click two cards to reveal and match delicious dessert emojis! You win the game when you match them all! 


**[View online & play the game here!](https://javascripterika.github.io/memory-game/)**

Made with ❤️, Vanilla Javascript 🍦 and CSS 🎨

To view the game locally, clone the repo, and view the HTML file in your browser!

---
### My Thoughts About the Process: 

This was a lot of fun - challenging, but fun.

I constantly thought about the user and user actions. I couldn't help myself! Tackling these issues introduced various ways for me to think about the logic and bugs (that I fixed along the way!). 

**Questions I asked during development:**

* What if a user keeps clicking on one card only? How should I treat that validation and how many times should that count towards their moves? 

* Should a player's counter moves be affected if they continously click on card sets that are already flipped? (Of course not!)

* When a user flips over 2 cards, and tries to click on other cards during the initial animation, should those flip too and how should I handle player moves? To answer, the flip animation must complete first as the user will be "locked" from clicking additional cards (they won't flip) and they aren't penalized for trying to click on other cards that won't flip.

* What if a user clicks on the restart button a million times without clicking a single card?

* What if a user clicks on the restart button while a card is flipped or in the process of being flipped?

* How should I handle if a user clicks a card that's already matched with its set with another random card that doesn't match?

I still consider this a WIP! I added in additional validation animation functionality for a fun and delightful experience.

#### Features I still want to add, include:
* Add levels to the game. As the user progresses through levels, the number of cards and difficulty increase. Maybe the cards will randomly shuffle the cards after every user move. Maybe add a timer to finish matching the cards by. Or!!!! I could have some sort of insanity mode! Another option is to allow the user to pick a theme of emojis to play with: animals, food, dessert, smilies, etc! Lots of possibilities!

* Convert this to React or Vue. I love vanilla JS, but I see the power in creating components and organizing my code, and being able to generate DOM elements via JSX for React is super awesome.

---

### Udacity's Required Functionality: 

**Logic**
* If the cards match, both cards stay flipped over
* If the cards do not match, both cards flip face down
* The game randomly shuffles the cards on page load, has a congratulations popup, and restart button

**Congratulations Popup**

* A modal appears to congratulate the player and ask if they want to play again. 
* A star rating should be present, and the amount of time to complete the game.

**Restart Button**

* A restart button allows the player to reset the game board, the timer, and the star rating.

**Star Rating**

* The game displays a star rating (from 1-3) that reflects the player's performance. At the beginning of a game, it should display 3 stars.
* After x number of moves, it should change to a 2 star rating. After a few more moves, it should change to a 1 star rating.

**Timer**

* When the player starts a game, a displayed timer should also start. Once the player wins the game, the timer stops.

**Move Counter**

* Game displays the current number of moves a user has made.
