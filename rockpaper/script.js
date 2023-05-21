function startGame(userChoice) {
  var choices = ["rock", "paper", "scissors"];

  if (choices.indexOf(userChoice) === -1) {
    document.getElementById("result").textContent = "Invalid choice. Please enter rock, paper, or scissors.";
    return;
  }

  var computerChoice = choices[Math.floor(Math.random() * choices.length)];

  document.getElementById("result").textContent = "The computer chose " + computerChoice + ". ";

  if (userChoice === computerChoice) {
    document.getElementById("result").textContent += "It's a tie!";
  } else if (
    (userChoice === "rock" && computerChoice === "scissors") ||
    (userChoice === "paper" && computerChoice === "rock") ||
    (userChoice === "scissors" && computerChoice === "paper")
  ) {
    document.getElementById("result").textContent += "You win!";
  } else {
    document.getElementById("result").textContent += "Computer wins!";
  }
}
