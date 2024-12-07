// To generate the board
import { xIcon, knightIcon } from "./Icons.js";
import Djikstra from "./Djikstra.js";
import Alert from "./Alert.js";

class Board {
  constructor(size = 8) {
    this.size = size;
    this.board = [];
    this.start = null;
    this.end = null;
    this.generateBoard();
    this.alert = new Alert();
  }

  generateBoard() {
    const boardElement = document.querySelector(".board");
    let color = `#ffffff`;

    for (let x = 0; x < this.size; x++) {
      let row = [];
      for (let y = 0; y < this.size; y++) {
        boardElement.insertAdjacentHTML(
          "beforeend",
          `<div class="square" x=${x} y=${y} style="background-color: ${color};"></div>`
        );
        color = color === `#ffffff` ? `#000000` : `#ffffff`;
        row.push(y);
      }
      this.board.push(row);
      color = color === `#ffffff` ? `#000000` : `#ffffff`;
    }

    this.addEventListeners();
  }

  addEventListeners() {
    const squares = document.querySelectorAll(`.square`);
    squares.forEach((square) => {
      square.addEventListener("click", (e) => {
        const x = Number(e.currentTarget.getAttribute("x"));
        const y = Number(e.currentTarget.getAttribute("y"));

        if (this.start === null) {
          this.start = [x, y];
          this.alert.addToAlert(`Starting Square: ${x}, ${y}`);
          square.innerHTML = knightIcon;
        } else if (this.end === null) {
          if (x === this.start[0] && y === this.start[1]) {
            this.alert.addToAlert(`End cannot be the same as start`);
            return;
          }

          this.end = [x, y];
          this.alert.addToAlert(`Ending Square: ${x}, ${y}`);
          square.innerHTML = xIcon;
        }
      });
    });
  }

  async startDjikstras() {
    if (this.start === null || this.end === null) {
      this.alert.addToAlert("Please select a start and end square.");
    }

    const djikstras = new Djikstra(this.board, this.start, this.end);
    const path = await djikstras.getPath();
    return path;
  }

  clearBoard() {
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        const square = document.querySelector(`[x="${i}"][y="${j}"]`);
        square.innerHTML = "";
      }
    }

    this.start = null;
    this.end = null;
  }
}

export default Board;
