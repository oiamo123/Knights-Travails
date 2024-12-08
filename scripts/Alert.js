class Alert {
  constructor() {
    this.alert = document.querySelector(`.moves`);
  }

  clearAlert() {
    this.alert.innerHTML = "";
  }

  addToAlert(data, id = null) {
    const classAttr = id !== null ? `class="${id}"` : "";
    this.alert.innerHTML += `<p ${classAttr}>${data}</p>`;
  }
}

export default Alert;
