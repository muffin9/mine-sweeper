import { $ } from "./util.js";

class Level {
  constructor({ onClick }) {
    const $easyBtn = $("#easy");
    const $mediumBtn = $("#medium");
    const $hardBtn = $("#hard");

    this.onClick = onClick;

    $easyBtn.addEventListener("click", () => {
      this.onClick(9, 9, 10, 10, 0);
    });

    $mediumBtn.addEventListener("click", () => {
      this.onClick(16, 16, 40, 40, 1);
    });

    $hardBtn.addEventListener("click", () => {
      this.onClick(16, 30, 99, 99, 2);
    });
  }
}

export default Level;
