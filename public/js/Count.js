import { $ } from "./util.js";

class Count {
  constructor({ mine, flag, onLoadData }) {
    const $minecount = $("#mine-count");
    const $flagcount = $("#flag-count");
    const $timecount = $("#time-count");
    const $rankcount = $("#rank-count");

    const $rankmodal = $(".rankmodal-wrapper");
    const $rankcancelBtn = $(".close-rankbtn");

    this.mine = mine;
    this.flag = flag;

    this.$minecount = $minecount;
    this.$flagcount = $flagcount;
    this.$timecount = $timecount;

    this.onLoadData = onLoadData;

    $rankcount.addEventListener("click", () => {
      $rankmodal.style.display = "block";
      this.onLoadData();
    });

    $rankcancelBtn.addEventListener("click", () => {
      $rankmodal.style.display = "none";
    });
  }

  setState(mine, flag) {
    this.mine = mine;
    this.flag = flag;
    this.render();
  }

  render() {
    this.$minecount.textContent = this.mine;
    this.$flagcount.textContent = this.flag;
  }

  timerender(time) {
    this.$timecount.textContent = time;
  }
}

export default Count;
