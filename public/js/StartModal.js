import { $ } from "./util.js";

class StartModal {
  constructor() {
    const $startmodal = $(".modal-wrapper");
    const $closeBtn = $(".close-btn");
    const $okBtn = $(".ok-btn");
    const $cancelBtn = $(".cancel-btn");

    $closeBtn.addEventListener("click", () => {
      $startmodal.style.display = "none";
    });

    $cancelBtn.addEventListener("click", () => {
      $startmodal.style.display = "none";
    });

    $okBtn.addEventListener("click", () => {
      $startmodal.style.display = "none";
    });
  }
}

export default StartModal;
