var score, roundScore, activePlayer, gamePlaying;

init(); // call init function to initialized the game environment
document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gamePlaying) {
    //1. random buner
    var dice = Math.floor(Math.random() * 6) + 1; // avoid decimals and get random number between 6 and 1
    // 2 display the result
    var diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = "dice-" + dice + ".png";
    //3. update the round score if the rolled number was not a 1
    if (dice !== 1) {
      // add score
      roundScore += dice;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
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

    // check if player won the game

    if (score[activePlayer] >= 20) {
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
