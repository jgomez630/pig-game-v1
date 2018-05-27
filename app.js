/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/
//Global Variables 
var scores, roundScore, activePlayer;

scores = [0,0]; //stores scores for both players
roundScore = 0; //stores scores for current round
activePlayer = 0; //stores scores for active player

// Set dice image to hidden
document.querySelector('.dice').style.display = 'none';

// Set roundScore & activePlayer score to zero
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';

// Roll dice button logic using an eventListener
document.querySelector('.btn-roll').addEventListener('click', function(){
	// 1. Random number
	var dice = Math.floor(Math.random() * 6) + 1;
	
	// 2. Display result
	var diceDOM = document.querySelector('.dice');
	diceDOM.style.display = 'block';	
	diceDOM.src = 'dice-' + dice + '.png';

	//3. Update roundScore IF the rolled number is not a 1. 
	if (dice !== 1){
		// Add score
		roundScore += dice;
		document.querySelector('#current-' + activePlayer).textContent = roundScore;		
	} else {
		nextPlayer();
	}
});
	
	document.querySelector('.btn-hold').addEventListener('click', function(){
	// add current score to global score
		scores[activePlayer] += roundScore;

	// Update UI 
	document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

	// Check if player won the game
	if (scores[activePlayer] >= 10){
	document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
	document.querySelector('.dice').style.display = 'none';
	document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
	document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active'); 
	} else {
		nextPlayer();
	}
});

	function nextPlayer() {
		// Next player (ternary)
		activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
		roundScore = 0;

		document.getElementById('current-0').textContent = 0;
		document.getElementById('current-1').textContent = 0;
		// Toggles active class from current player 
		document.querySelector('.player-0-panel').classList.toggle('active');
		document.querySelector('.player-1-panel').classList.toggle('active');

		// Resets dice display for next player
		diceDOM.style.display = 'none';
	}	
	