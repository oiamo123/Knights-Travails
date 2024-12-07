import { knightIcon } from "./Icons.js";

class Alert {
  constructor() {
    this.alert = document.querySelector(`.alert`);
  }

  clearAlert() {
    this.alert.innerHTML = "";
    this.addToAlert("Notifications:");
  }

  addToAlert(data, id = null) {
    this.alert.innerHTML += `<p ${id !== null && `class=${id}`}>${data}</p>`;
  }
}

export default Alert;
