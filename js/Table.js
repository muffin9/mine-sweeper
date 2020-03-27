import { $ } from "./util.js";
import errorCheck from "./errorCheck.js";

class Table {
  data = [];
  dataMine = [];
  constructor({ row, column, mine, flag }) {
    const $table = $("#table");
    this.row = row;
    this.column = column;
    this.mine = mine;
    this.flag = flag;

    this.$table = $table;

    this.onLeftClick = (e, i, j) => {
      let surround = [this.data[i][j - 1], this.data[i][j + 1]];
      if (this.data[i][j] === "X") {
        alert("실패ㅠㅠ");
      }
      if (this.data[i - 1]) {
        surround = surround.concat(
          this.data[i - 1][j - 1],
          this.data[i - 1][j],
          this.data[i - 1][j + 1]
        );
      }
      if (this.data[i + 1]) {
        surround = surround.concat(
          this.data[i + 1][j - 1],
          this.data[i + 1][j],
          this.data[i + 1][j + 1]
        );
      }
      const surroundMine = surround.filter(element => {
        return element === "X";
      }).length;

      this.$table.children[i].children[j].innerHTML = surroundMine || "";

      if (surroundMine === 0) {
      }
    };

    this.onRightClick = (e, i, j) => {
      const text = this.$table.children[i].children[j].innerHTML;

      if (text === "" && this.flag === 0) {
        alert("깃발을 전부 사용하셨습니다.");
        return;
      }

      if (text === "") {
        this.$table.children[i].children[j].innerHTML = 1;
        this.data[i][j] = 1;
        this.flag -= 1;
      } else if (text === "1") {
        if (this.data[i][j] === 1) {
          this.$table.children[i].children[j].innerHTML = "";
          this.data[i][j] = 0;
          this.flag += 1;
        } else if (this.data[i][j] === "X") {
          this.$table.children[i].children[j].innerHTML = "X";
          this.data[i][j] = "X";
          this.flag += 1;
        }
      } else if (text === "X") {
        this.$table.children[i].children[j].innerHTML = "1";
        this.flag -= 1;
      }
    };
  }

  setState(data) {
    const { row, column, mine, flag } = data;
    this.row = row;
    this.column = column;
    this.mine = mine;
    this.flag = flag;
    this.render();
  }

  createTable() {
    this.$table.innerHTML = "";
    this.data = [];
    this.dataMine = [];
    for (let i = 0; i < this.row; i++) {
      const $tr = document.createElement("tr");
      const array = [];
      this.$table.appendChild($tr);
      for (let j = 0; j < this.column; j++) {
        const $td = document.createElement("td");
        $tr.appendChild($td);
        array.push(0);
        $td.addEventListener("click", e => this.onLeftClick(e, i, j));
        $td.addEventListener("contextmenu", e => this.onRightClick(e, i, j));
      }
      this.data.push(array);
    }
  }

  plantMine() {
    // this.column * this.row 배열에 랜덤으로 지뢰 심기
    const candidate = Array(this.column * this.row)
      .fill()
      .map((element, index) => {
        return index;
      });
    while (candidate.length > this.column * this.row - this.mine) {
      const pick = candidate.splice(Math.random() * candidate.length, 1)[0];
      this.dataMine = this.dataMine.concat(pick);
    }

    for (let i = 0; i < this.dataMine.length; i++) {
      const minerow = Math.floor(this.dataMine[i] / this.column);
      const minecolumn = this.dataMine[i] % this.column;

      this.data[minerow][minecolumn] = "X";
      this.$table.children[minerow].children[minecolumn].innerHTML = "X";
    }
  }

  render() {
    this.createTable();
    this.plantMine();
  }
}

export default Table;
