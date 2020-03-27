import Modal from "./Modal.js";
import Table from "./Table.js";
import Level from "./Level.js";

class App {
  row = 9;
  column = 9;
  mine = 10;
  flag = 10;
  data = [];
  constructor() {
    this.modal = new Modal();
    this.table = new Table({
      row: this.row,
      column: this.column,
      mine: this.mine,
      flag: this.flag,
      data: this.data
    });

    this.Level = new Level({
      onClick: (row, column, mine, flag) => {
        const data = { row, column, mine, flag };
        this.table.setState(data);
      }
    });

    this.init();
  }

  init() {
    this.table.render();
  }
}

export default App;
