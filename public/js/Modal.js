import { $ } from "./util.js";

class Modal {
  constructor() {
    const $modal = $(".modal-wrapper");
    const $closeBtn = $(".close-btn");
    const $okBtn = $(".ok-btn");
    const $cancelBtn = $(".cancel-btn");

    $closeBtn.addEventListener("click", () => {
      $modal.style.display = "none";
    });

    $cancelBtn.addEventListener("click", () => {
      $modal.style.display = "none";
    });

    $okBtn.addEventListener("click", () => {
      $modal.style.display = "none";
    });
  }
}

export default Modal;
