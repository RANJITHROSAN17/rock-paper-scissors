# Rock–Paper–Scissors

A five-round browser game built with plain HTML, CSS and JavaScript. Choose a button, see the computer’s move and keep score—no account, framework or package installation.

[**Play in your browser**](https://ranjithrosan17.github.io/rock-paper-scissors/)

## Run locally

Clone this repository and open `index.html` in a browser. All game assets are included locally.

```bash
git clone https://github.com/RANJITHROSAN17/rock-paper-scissors.git
cd rock-paper-scissors
# Open index.html using your file manager or browser.
```

Click **Rock**, **Paper** or **Scissors**. After five rounds, the choices lock and the match result appears. **Play again** resets scores and unlocks the controls. Ties count as a round. Only the classic three choices are implemented; there is no lizard/Spock mode.

The computer chooses independently with `Math.random()`; this is a casual game, not a cryptographically fair contest.

## Learn from the code

- `index.html`: the controls and live result region.
- `script.js`: independent computer choice, winner calculation, match state and reset.
- `style.css`: choice-card styling; images are checked into this repository.

## Verify changes

With Node.js 20+ (development only):

```bash
node --test test/game.test.cjs
```

Tests cover all nine matchups, invalid input, a complete five-round match, no extra scoring after the match, and replay. Also check keyboard controls and layout in a real browser; the Node tests use a small DOM fixture, not a browser engine.

## Contribute

See [CONTRIBUTING.md](CONTRIBUTING.md). A useful bug report includes browser/version, the choices made and the expected versus actual result. A useful small improvement is a keyboard or mobile-layout fix with a reproducible check—not a dependency added for its own sake.

## Maintainer

**[Ranjith Rosan](https://github.com/RANJITHROSAN17)** maintains this Rock–Paper–Scissors browser game and its learning examples.

## License

[MIT](LICENSE).
