import { $ } from "./util.js";

class Count {
  constructor({ mine, flag }) {
    const $minecount = $("#mine-count");
    const $flagcount = $("#flag-count");
    const $timecount = $("#time-count");
    const $rankcount = $("#rank-count");

    this.mine = mine;
    this.flag = flag;

    this.$minecount = $minecount;
    this.$flagcount = $flagcount;
    this.$timecount = $timecount;

    $rankcount.addEventListener("click", () => {});
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
