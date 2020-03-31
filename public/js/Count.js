import { $ } from "./util.js";

class Count {
  data = [];
  constructor({ mine, flag, onLoadData }) {
    const $minecount = $("#mine-count");
    const $flagcount = $("#flag-count");
    const $timecount = $("#time-count");
    const $rankcount = $("#rank-count");

    const $rankmodal = $(".rankmodal-wrapper");
    const $rankcancelBtn = $(".close-rankbtn");

    const $easyText = $("#easy-text");
    const $midText = $("#mid-text");
    const $hardText = $("#hard-text");

    this.mine = mine;
    this.flag = flag;

    this.onLoadData = onLoadData;

    this.$minecount = $minecount;
    this.$flagcount = $flagcount;
    this.$timecount = $timecount;

    this.$easyText = $easyText;
    this.$midText = $midText;
    this.$hardText = $hardText;

    this.data = data;

    $rankcount.addEventListener("click", () => {
      this.data = [];
      $rankmodal.style.display = "block";
      this.data = this.onLoadData();
      this.rankrender();
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

  rankrender() {
    const easy = this.data.filter(data => {
      return data.difficulty === 0 ? data : "";
    });
    const mid = this.data.filter(data => {
      return data.difficulty === 1 ? data : "";
    });
    const hard = this.data.filter(data => {
      return data.difficulty === 2 ? data : "";
    });
    const easyRank = easy.sort((a, b) => {
      return a.time - b.time;
    });
    const midRank = mid.sort((a, b) => {
      return a.time - b.time;
    });
    const hardRank = hard.sort((a, b) => {
      return a.time - b.time;
    });

    this.$easyText.innerHTML = easyRank
      .map(element => {
        return `<p>${element.nickname} ${element.time}초</p>`;
      })
      .join("");

    this.$midText.innerHTML = midRank
      .map(element => {
        return `<p>${element.nickname} ${element.time}초</p>`;
      })
      .join("");

    this.$hardText.innerHTML = hardRank
      .map(element => {
        return `<p>${element.nickname} ${element.time}초</p>`;
      })
      .join("");
  }
}

export default Count;
