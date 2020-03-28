import Modal from "./Modal.js";
import Table from "./Table.js";
import Level from "./Level.js";
import Count from "./Count.js";

class App {
  constructor() {
    this.myTimer = () => {
      setInterval(() => this.count.timerender(), 1000);
    };

    this.modal = new Modal();
    this.table = new Table({
      row: 9,
      column: 9,
      mine: 10,
      flag: 10,
      life: false,
      myTimer: this.myTimer
    });

    this.level = new Level({
      onClick: (row, column, mine, flag) => {
        const data = { row, column, mine, flag };
        this.table.setState(data);
        this.count.setState(mine, flag);
      }
    });

    this.count = new Count({
      mine: 10,
      flag: 10,
      myTimer: this.myTimer
    });

    this.init();
  }

  init() {
    this.table.render();
    this.count.render();
  }
}

export default App;
