import StartModal from "./StartModal.js";
import RankModal from "./RankModal.js";
import Table from "./Table.js";
import Level from "./Level.js";
import Count from "./Count.js";

class App {
  timeCheck;
  myTimer;
  nickname;
  time = 0;
  ranks = [];
  constructor() {
    (this.myTimer = () => {
      clearInterval(this.timeCheck);
      this.time = 0;
      return (this.timeCheck = setInterval(() => {
        this.time += 1;
        this.count.timerender(this.time);
      }, 1000));
    })();

    this.startmodal = new StartModal();
    this.rankmodal = new RankModal();
    this.table = new Table({
      row: 9,
      column: 9,
      mine: 10,
      flag: 10,
      time: this.time,
      timeCheck: this.timeCheck,
      nickname: this.nickname,
      onNewClick: (row, column, mine, flag) => {
        const time = this.myTimer();
        const data = { row, column, mine, flag, time };
        this.table.setState(data);
        this.count.setState(mine, flag);
      },
      onRankEnrollment: nickname => {
        const user = { nickname, time: this.time };
        this.ranks = this.ranks.concat(user);
        console.log(this.ranks);
        const database = firebase.database();
        database.ref("user/").push({
          nickname: nickname,
          time: this.time
        });
      }
    });

    this.level = new Level({
      onClick: (row, column, mine, flag) => {
        const time = this.myTimer();
        const data = { row, column, mine, flag, time };
        this.table.setState(data);
        this.count.setState(mine, flag);
      }
    });

    this.count = new Count({
      mine: 10,
      flag: 10,
      onLoadData: () => {
        const database = firebase.database();
        const data = database.ref("user/");
        data.on("child_added", data => {
          console.log(data.val());
        });
      }
    });

    this.init();
  }

  init() {
    this.table.render();
  }
}

export default App;
