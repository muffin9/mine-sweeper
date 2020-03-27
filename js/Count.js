import { $ } from "./util.js";

class Count {
  myTimer;
  time = 0;
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

    this.myTimer = setInterval(() => this.timerender(), 1000);
  }

  setState(mine, flag) {
    this.mine = mine;
    this.flag = flag;
    this.time = 0;
    this.render();
  }

  render() {
    this.$minecount.textContent = this.mine;
    this.$flagcount.textContent = this.flag;
  }

  timerender() {
    this.time += 1;
    this.$timecount.textContent = this.time;
  }
}

export default Count;