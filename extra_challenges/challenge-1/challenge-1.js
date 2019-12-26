var scores, roundScore, activePlayer, playState;

init();

var lastDice;

document.querySelector('.bttn-roll-dice').addEventListener('click', function() {
  if (playState) {
    // Gets a random number
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;

    // Displays the result
    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';
    document.getElementById('dice-1').src = 'images/dice-' + dice1 + '.png';
    document.getElementById('dice-2').src = 'images/dice-' + dice2 + '.png';

    // Updates the round score if one of the rolled number was not a 1.
    if (dice1 !== 1 && dice2 !== 1) {
      // Adds it to the current score
      roundScore += dice1 + dice2;
      document.querySelector('#current-p' + activePlayer).textContent = roundScore;
    } else {
      // It is next player's turn
      nextPlayer();
    }
  }
});

document.querySelector('.bttn-hold').addEventListener('click', function() {
  if (playState) {
    // Adds current score to the global score
    scores[activePlayer] += roundScore;

    // Updates the UI
    document.querySelector('#score-p' + activePlayer).textContent = scores[activePlayer];

    var input = document.querySelector('.final-score').value;
    var finalScore;

    // undefined, 0, null or "" are coerced to false
    // anything else is coerced to true
    if (input) {
      finalScore = input;
    } else {
      finalScore = 100;
    }

    // Checks if the player won the game
    if (scores[activePlayer] >= finalScore) {
      document.querySelector('#player-' + activePlayer).textContent = 'Winner!';
      hideDice();
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      playState = false;
    } else {
      // It is next player's turn
      nextPlayer();
    }
  }
});

// player changing function
function nextPlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;
  lastDice = -1;

  document.getElementById('current-p0').textContent = 0;
  document.getElementById('current-p1').textContent = 0;

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  hideDice();
};

document.querySelector('.bttn-new-game').addEventListener('click', init);

// initialization function
function init() {
  playState = true;
  scores = [0,0];
  activePlayer = 0;
  roundScore = 0;
  hideDice();

  document.getElementById('score-p0').textContent = 0;
  document.getElementById('score-p1').textContent = 0;
  document.getElementById('current-p0').textContent = 0;
  document.getElementById('current-p1').textContent = 0;
  document.getElementById('player-0').textContent = 'Player 1';
  document.getElementById('player-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
};

function hideDice() {
  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';
};