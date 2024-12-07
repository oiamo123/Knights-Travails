import Board from "./Board.js";
import Alert from "./Alert.js";
import { knightIcon } from "./Icons.js";
import PriorityQueue from "./PriorityQueue.js";

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
    this.start.addEventListener(`click`, () => this.startHandler());
    this.reset.addEventListener(`click`, () => this.resetHandler());
    this.next.addEventListener(`click`, () => this.nextMove());
    this.prev.addEventListener(`click`, () => this.previousMove());
  }

  startHandler() {
    this.moves = this.board.startDjikstras().reverse();
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

    // Update the knight's position on the board
    const [x, y] = this.moves[this.currentMoveIndex];
    const square = document.querySelector(`[x="${x}"][y="${y}"]`);
    square.innerHTML = knightIcon;

    // Highlight the current move in the alert
    const alertParagraphs = document.querySelectorAll(".alert p");
    alertParagraphs.forEach((p, index) => {
      if (index === this.currentMoveIndex + 1) {
        // +1 because the first <p> is "Notifications:"
        p.classList.add("highlight");
      } else {
        p.classList.remove("highlight");
      }
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
