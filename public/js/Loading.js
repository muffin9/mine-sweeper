import { $ } from "./util.js";

class Loading {
  constructor() {
    const $Loading = $(".loading");

    this.$Loading = $Loading;
  }
  setState(check) {
    if (check) this.$Loading.style.display = "block";
    else this.$Loading.style.display = "none";
  }
}

export default Loading;
