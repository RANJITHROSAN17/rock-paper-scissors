'use strict';

const choices = ['rock', 'paper', 'scissors'];
let userScore = 0;
let computerScore = 0;
let rounds = 0;

function determineWinner(user, computer) {
  if (!choices.includes(user) || !choices.includes(computer)) {
    throw new RangeError('Choose rock, paper or scissors.');
  }
  if (user === computer) return 'tie';
  return { rock: 'scissors', paper: 'rock', scissors: 'paper' }[user] === computer
    ? 'user' : 'computer';
}

function updateScore() {
  document.getElementById('score').textContent =
    `You ${userScore} — Computer ${computerScore} · Round ${rounds}/5`;
}

function startGame(userChoice) {
  if (rounds >= 5 || !choices.includes(userChoice)) return;
  const computerChoice = choices[Math.floor(Math.random() * choices.length)];
  const result = determineWinner(userChoice, computerChoice);
  if (result === 'user') userScore++;
  if (result === 'computer') computerScore++;
  rounds++;
  const message = result === 'tie' ? 'Tie.' : result === 'user' ? 'You win this round!' : 'Computer wins this round.';
  document.getElementById('result').textContent = `You chose ${userChoice}; computer chose ${computerChoice}. ${message}`;
  updateScore();
  if (rounds === 5) {
    const final = userScore === computerScore ? 'The match is a tie.' : userScore > computerScore ? 'You win the match!' : 'Computer wins the match.';
    document.getElementById('result').textContent += ` ${final} Choose Play again to restart.`;
    document.querySelectorAll('.choice-button').forEach(button => { button.disabled = true; });
  }
}

function resetGame() {
  userScore = 0;
  computerScore = 0;
  rounds = 0;
  document.getElementById('result').textContent = 'Choose rock, paper or scissors.';
  document.querySelectorAll('.choice-button').forEach(button => { button.disabled = false; });
  updateScore();
}
