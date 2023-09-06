// Define variables to keep track of scores
var userScore = 0;
var computerScore = 0;
var rounds = 0;

function startGame(userChoice) {
  var choices = ["rock", "paper", "scissors"];
  var computerChoice = choices[Math.floor(Math.random() * choices.length)];

  // Update the displayed choices with images
  displayChoices(userChoice, computerChoice);

  // Determine the winner and update the result
  var result = determineWinner(userChoice, computerChoice);
  updateResult(result);

  // Update scores and rounds
  if (result === "user") {
    userScore++;
  } else if (result === "computer") {
    computerScore++;
  }
  rounds++;

  // Update the score display
  updateScore();

  // Check if the game is over
  if (rounds >= 5) {
    showFinalResult();
  }
}

// Helper function to display images of choices
function displayChoices(userChoice, computerChoice) {
  // Replace with your image file paths
  var userImageSrc = userChoice + "-image.png";
  var computerImageSrc = computerChoice + "-image.png";

  // Update the image elements with the appropriate sources
  document.getElementById("user-choice-img").src = userImageSrc;
  document.getElementById("computer-choice-img").src = computerImageSrc;
}

// Helper function to determine the winner
function determineWinner(userChoice, computerChoice) {
  if (userChoice === computerChoice) {
    return "tie";
  } else if (
    (userChoice === "rock" && computerChoice === "scissors") ||
    (userChoice === "paper" && computerChoice === "rock") ||
    (userChoice === "scissors" && computerChoice === "paper")
  ) {
    return "user";
  } else {
    return "computer";
  }
}

// Helper function to update the result display
function updateResult(result) {
  var resultElement = document.getElementById("result");
  var resultMessage;

  if (result === "tie") {
    resultMessage = "It's a tie!";
  } else if (result === "user") {
    resultMessage = "You win!";
  } else {
    resultMessage = "Computer wins!";
  }

  resultElement.textContent = resultMessage;
}

// Helper function to update the score display
function updateScore() {
  document.getElementById("user-score").textContent = userScore;
  document.getElementById("computer-score").textContent = computerScore;
}

// Helper function to show the final result and reset the game
function showFinalResult() {
  var resultElement = document.getElementById("result");
  var finalResultMessage;

  if (userScore > computerScore) {
    finalResultMessage = "Congratulations! You win the game!";
  } else if (userScore < computerScore) {
    finalResultMessage = "Computer wins the game. Better luck next time!";
  } else {
    finalResultMessage = "It's a tie. The game is drawn.";
  }

  resultElement.textContent = finalResultMessage;

  // Optionally, reset the scores and rounds for a new game
  userScore = 0;
  computerScore = 0;
  rounds = 0;
}
