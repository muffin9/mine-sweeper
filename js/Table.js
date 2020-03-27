import { $ } from "./util.js";

class Table {
  constructor({ row, column, mine, flag, data }) {
    const $table = $("#table");
    this.row = row;
    this.column = column;
    this.mine = mine;
    this.flag = flag;
    this.data = data;

    this.dataMine = [];
    this.$table = $table;
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
    console.log(this.column, this.row);
    for (let i = 0; i < this.column; i++) {
      const $tr = document.createElement("tr");
      const array = [];
      this.$table.appendChild($tr);
      for (let j = 0; j < this.row; j++) {
        const $td = document.createElement("td");
        $tr.appendChild($td);
        array.push(0);
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
      const minecolumn = Math.floor(this.dataMine[i] / this.column);
      const minerow = this.dataMine[i] % this.column;
      this.data[minecolumn][minerow] = "X";
    }

    console.log(this.dataMine);
    console.log(this.data);
  }

  render() {
    this.createTable();
    this.plantMine();
  }
}

export default Table;
