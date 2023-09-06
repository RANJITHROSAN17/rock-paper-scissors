function startGame(userChoice) {
  var choices = ["rock", "paper", "scissors"];
  
  // Generate a random number between 0 and 1
  var random = Math.random();

  // Define a threshold for computer's behavior
  var threshold = 0.7;

  // Determine computerChoice based on randomness
  var computerChoice;
  if (random < threshold) {
    // If random is less than the threshold, choose randomly from the regular choices
    computerChoice = choices[Math.floor(Math.random() * choices.length)];
  } else {
    // If random is greater than or equal to the threshold, choose a "tricky" move
    var trickyMoves = ["rock", "paper", "scissors"];
    trickyMoves.splice(trickyMoves.indexOf(userChoice), 1); // Remove user's choice
    computerChoice = trickyMoves[Math.floor(Math.random() * trickyMoves.length)];
  }

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
