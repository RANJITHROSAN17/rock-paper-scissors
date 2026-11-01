const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');

function game() {
  const nodes = { score: {}, result: {} };
  const buttons = [{ disabled: false }, { disabled: false }, { disabled: false }];
  const math = Object.create(Math);
  math.random = () => 0.8; // scissors
  const context = vm.createContext({ Math: math, document: {
    getElementById: id => nodes[id],
    querySelectorAll: () => buttons,
  }});
  vm.runInContext(fs.readFileSync(path.join(__dirname, '../script.js'), 'utf8'), context);
  return { context, nodes, buttons };
}

test('all nine classic matchups and invalid input', () => {
  const { context } = game();
  const cases = [
    ['rock', 'rock', 'tie'], ['rock', 'paper', 'computer'], ['rock', 'scissors', 'user'],
    ['paper', 'rock', 'user'], ['paper', 'paper', 'tie'], ['paper', 'scissors', 'computer'],
    ['scissors', 'rock', 'computer'], ['scissors', 'paper', 'user'], ['scissors', 'scissors', 'tie'],
  ];
  for (const [user, computer, expected] of cases) {
    assert.equal(context.determineWinner(user, computer), expected);
  }
  assert.throws(() => context.determineWinner('spock', 'rock'), /Choose/);
});

test('five rounds lock choices; an extra click does not score; replay resets', () => {
  const { context, nodes, buttons } = game();
  context.startGame('invalid');
  assert.equal(nodes.score.textContent, undefined);
  for (let i = 0; i < 5; i++) context.startGame('rock');
  assert.match(nodes.score.textContent, /You 5 — Computer 0 · Round 5\/5/);
  assert.match(nodes.result.textContent, /You win the match/);
  assert.ok(buttons.every(button => button.disabled));
  const score = nodes.score.textContent;
  context.startGame('paper');
  assert.equal(nodes.score.textContent, score);
  context.resetGame();
  assert.match(nodes.score.textContent, /You 0 — Computer 0 · Round 0\/5/);
  assert.ok(buttons.every(button => !button.disabled));
  context.startGame('paper');
  assert.match(nodes.score.textContent, /You 0 — Computer 1 · Round 1\/5/);
});

test('a tied match has no winner', () => {
  const { context, nodes } = game();
  for (let i = 0; i < 5; i++) context.startGame('scissors');
  assert.match(nodes.result.textContent, /The match is a tie/);
});

test('HTML provides all required result nodes and replay control', () => {
  const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
  for (const id of ['score', 'result']) assert.match(html, new RegExp(`id="${id}"`));
  assert.match(html, /onclick="resetGame\(\)"/);
  assert.match(html, /role="status"/);
});
