import Board from "./Board.js";
import Alert from "./Alert.js";
import { knightIcon } from "./Icons.js";

class App {
  constructor() {
    this.moves = null;
    this.board = new Board();
    this.alert = new Alert();
    this.next = document.querySelector(`.next`);
    this.prev = document.querySelector(`.prev`);
    this.start = document.querySelector(`.start`);
    this.reset = document.querySelector(`.reset`);
    this.currentMoveIndex = 0;
    this.addEventHandlers();
  }

  addEventHandlers() {
    this.start.addEventListener(`click`, () => this.startHandler(false));
    this.reset.addEventListener(`click`, () => this.resetHandler());
    this.next.addEventListener(`click`, () => this.nextMove());
    this.prev.addEventListener(`click`, () => this.previousMove());
  }

  async startHandler() {
    this.moves = await this.board.startDjikstras();
    this.currentMoveIndex = 0;
    this.alert.clearAlert();

    this.moves.forEach((square, i) => {
      this.alert.addToAlert(
        `${i === 0 ? "Starting Square:" : `Move ${i}:`} ${square[0]}, ${
          square[1]
        }`
      );
    });

    // Highlight the first move in the alert
    const firstMove = document.querySelector(".alert p:nth-child(2)");
    if (firstMove) firstMove.classList.add("highlight");

    // Reset navigation button states
    this.updateNavigationButtons();
    this.updateKnightPosition();
  }

  resetHandler() {
    this.board.clearBoard();
    this.alert.clearAlert();
    this.moves = null;
    this.currentMoveIndex = 0;

    // Reset button states
    this.prev.classList.remove("active");
    this.next.classList.remove("active");
  }

  previousMove() {
    if (this.currentMoveIndex > 0) {
      this.currentMoveIndex--;
      this.updateKnightPosition();
    }
  }

  nextMove() {
    if (this.currentMoveIndex < this.moves.length - 1) {
      this.currentMoveIndex++;
      this.updateKnightPosition();
    }
  }

  updateKnightPosition() {
    this.board.clearBoard();

    const [x, y] = this.moves[this.currentMoveIndex];
    const square = document.querySelector(`[x="${x}"][y="${y}"]`);
    if (square) square.innerHTML = knightIcon;

    const moveParagraphs = document.querySelectorAll(".moves p");
    moveParagraphs.forEach((p, index) => {
      p.classList.toggle("highlight", index === this.currentMoveIndex);
    });

    this.updateNavigationButtons();
  }

  updateNavigationButtons() {
    if (this.currentMoveIndex > 0) {
      this.prev.classList.add("active");
    } else {
      this.prev.classList.remove("active");
    }

    // Enable or disable the Next button
    if (this.moves && this.currentMoveIndex < this.moves.length - 1) {
      this.next.classList.add("active");
    } else {
      this.next.classList.remove("active");
    }
  }
}

new App();
