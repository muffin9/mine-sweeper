import { $ } from "./util.js";

class Level {
  constructor({ onClick }) {
    const $easyBtn = $("#easy");
    const $mediumBtn = $("#medium");
    const $hardBtn = $("#hard");

    this.onClick = onClick;

    $easyBtn.addEventListener("click", () => {
      this.onClick(9, 9, 10, 10);
    });

    $mediumBtn.addEventListener("click", () => {
      this.onClick(16, 16, 40, 40);
    });

    $hardBtn.addEventListener("click", () => {
      this.onClick(30, 16, 99, 99);
    });
  }
}

export default Level;
