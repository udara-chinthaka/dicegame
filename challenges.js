var score, roundScore, activePlayer, gamePlaying;
var lastDice;

init(); // call init function to initialized the game environment
document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gamePlaying) {
    //1. random buner
    var dice = Math.floor(Math.random() * 6) + 1; // avoid decimals and get random number between 6 and 1
    //var dice = 6;

    // 2 display the result
    var diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = "dice-" + dice + ".png";

    // disable hold button if player got 6
    if (dice === 6) {
      document.querySelector(".btn-hold").style.display = "none";
    } else {
      document.querySelector(".btn-hold").style.display = "inline-block";
    }

    //3. update the round score if the rolled number was not a 1

    if (lastDice === 6 && dice === 6) {
      // adding a new role
      score[activePlayer] = 0;
      document.querySelector("#score-" + activePlayer).textContent = "0";
      lastDice = 0;
      console.log(lastDice + " last dice");
      console.log(dice + " dice");

      nextPlayer();
    } else if (dice !== 1) {
      // add score
      roundScore += dice;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
      lastDice = dice;
    } else {
      nextPlayer();
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlaying) {
    // add current score to global score
    score[activePlayer] += roundScore;

    //update the UI
    document.querySelector("#score-" + activePlayer).textContent =
      score[activePlayer];

    // get user entered final score
    var input = document.querySelector(".final-score").value;
    var winningScore;
    if (input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }

    // check if player won the game

    if (score[activePlayer] >= winningScore) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner..!";
      document.querySelector(".dice").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gamePlaying = false;
    } else {
      // change player
      nextPlayer();
    }
  }
});

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  // change background
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  // document.querySelector(".player-0-panel").classList.remove("active");
  // document.querySelector(".player-1-panel").classList.add("active");

  document.querySelector(".dice").style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", init);

// initialize the game
function init() {
  // set current score
  //document.querySelector("#current-" + activePlayer).textContent = dice;
  //document.querySelector('#current-'+activePlayer).innerHTML='<em>'+dice+'</em>';

  // variables for players

  score = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  //dice = Math.floor(Math.random() * 6) + 1; // avoid decimals and get random number between 6 and 1

  document.querySelector(".dice").style.display = "none";

  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}

document.querySelector(".view-roles").addEventListener("click", function() {
  document.querySelector(".roles").classList.toggle("view");
});
