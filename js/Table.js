import { $, codeTable } from "./util.js";

class Table {
  data = [];
  dataMine = [];
  constructor({ row, column, mine, flag, life, myTimer }) {
    const $table = $("#table");
    this.row = row;
    this.column = column;
    this.mine = mine;
    this.flag = flag;

    this.$table = $table;

    this.life = life;

    this.onLeftClick = (e, i, j) => {
      if (this.life) return;
      e.target.classList.add("opened");
      let surround = [this.data[i][j - 1], this.data[i][j + 1]];
      if (this.data[i][j] === codeTable.mine) {
        e.target.textContent = "펑";
        this.life = true;
        return;
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
        return element === codeTable.mine;
      }).length;

      this.$table.children[i].children[j].innerHTML = surroundMine || "";

      if (surroundMine === 0) {
        // 해당 클릭한 칸 주변에 지뢰가 없을 시  클릭한 칸에 2(open)를 대입
        this.data[i][j] = codeTable.open;
        let surroundCanne = [];
        if (this.$table.children[i - 1]) {
          surroundCanne = surroundCanne.concat(
            this.$table.children[i - 1].children[j - 1],
            this.$table.children[i - 1].children[j],
            this.$table.children[i - 1].children[j + 1]
          );
        }
        surroundCanne = surroundCanne.concat(
          this.$table.children[i].children[j - 1],
          this.$table.children[i].children[j + 1]
        );
        if (this.$table.children[i + 1]) {
          surroundCanne = surroundCanne.concat(
            this.$table.children[i + 1].children[j - 1],
            this.$table.children[i + 1].children[j],
            this.$table.children[i + 1].children[j + 1]
          );
        }

        surroundCanne = surroundCanne.filter(v => {
          return !!v;
        });

        surroundCanne.forEach(nextCanne => {
          const parentTr = nextCanne.parentNode;
          const parentTable = nextCanne.parentNode.parentNode;

          const nextCanneCanne = Array.prototype.indexOf.call(
            parentTr.children,
            nextCanne
          );
          const nextCanneLine = Array.prototype.indexOf.call(
            parentTable.children,
            parentTr
          );
          if (this.data[nextCanneLine][nextCanneCanne] !== codeTable.open)
            nextCanne.click();
        });
      }
    };

    this.onRightClick = (e, i, j) => {
      if (this.life) return;
      const text = this.$table.children[i].children[j].innerHTML;

      if (text === "" && this.flag === 0) {
        alert("깃발을 전부 사용하셨습니다.");
        return;
      }

      if (text === "") {
        this.$table.children[i].children[j].innerHTML = codeTable.flag;
        this.data[i][j] = codeTable.flag;
        this.flag -= 1;
      } else if (text === "1") {
        if (this.data[i][j] === codeTable.flag) {
          this.$table.children[i].children[j].innerHTML = "";
          this.data[i][j] = codeTable.blank;
          this.flag += 1;
        } else if (this.data[i][j] === codeTable.mine) {
          this.$table.children[i].children[j].innerHTML = "X";
          this.data[i][j] = codeTable.mine;
          this.flag += 1;
        }
      } else if (text === "X") {
        this.$table.children[i].children[j].innerHTML = codeTable.flag;
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
    this.life = false;
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

      this.data[minerow][minecolumn] = codeTable.mine;
      this.$table.children[minerow].children[minecolumn].innerHTML = "X";
    }
  }

  render() {
    this.createTable();
    this.plantMine();
  }
}

export default Table;
