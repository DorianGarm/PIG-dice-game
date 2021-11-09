'use strict';

//DOM element selection list
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const dice0El = document.querySelector('.dice0');
const dice1El = document.querySelector('.dice1');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnOpenModal = document.querySelector('.btn--instructions');
const input = document.querySelector('.final-score');
const name0El = document.getElementById('name--0');
const name1El = document.getElementById('name--1');

// Initial conditions
let scores, currentScore, activePlayer, playing, winningScore;

function init() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  input.value = null;
  name0El.textContent = 'Player 1';
  name1El.textContent = 'Player 2';

  dice0El.classList.add('hidden');
  dice1El.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
}

init();

// Rolling the dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generate a random number
    const dice0 = Math.trunc(Math.random() * 6) + 1;
    const dice1 = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    dice0El.classList.remove('hidden');
    dice0El.src = `img/dice-${dice0}.png`;
    dice1El.classList.remove('hidden');
    dice1El.src = `img/dice-${dice1}.png`;

    // 3. Chceck for rolled 1
    if (dice0 !== 1 && dice1 !== 1) {
      // if false, add to the current score
      currentScore += dice0 + dice1;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // if true, switch to next player
      switchPlayer();
    }
  }
});

// Holding functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    // 0. Establish the winning score
    if (input.value) {
      winningScore = parseInt(input.value);
    } else {
      winningScore = 100;
    }
    // 1. Add current score to the total score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Chceck if the player won.
    if (scores[activePlayer] >= winningScore) {
      playing = false;
      document.getElementById(`name--${activePlayer}`).textContent = 'Winner!';
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      input.value = null;
    } else {
      switchPlayer();
    }
  }
});

// New Game functionality
btnNew.addEventListener('click', init);

// Switching players
function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

// Instructions functionality
btnOpenModal.addEventListener('click', clickHandlerOpen);
btnCloseModal.addEventListener('click', clickHandlerClose);
overlay.addEventListener('click', clickHandlerClose);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    clickHandlerClose();
  }
});

function clickHandlerOpen() {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
}

function clickHandlerClose() {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
}
