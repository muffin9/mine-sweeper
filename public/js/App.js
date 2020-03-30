import StartModal from "./StartModal.js";
import RankModal from "./RankModal.js";
import Table from "./Table.js";
import Level from "./Level.js";
import Count from "./Count.js";
import Loading from "./Loading.js";
import errorCheck from "./errorCheck.js";

class App {
  timeCheck;
  myTimer;
  nickname;
  time = 0;
  ranks = [];
  difficulty = 0; // 0 :easy  , 1 : mid , 2 : hard
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
        // console.log(this.ranks);
        const database = firebase.database();
        database.ref("user/").push({
          difficulty: this.difficulty,
          nickname: nickname,
          time: this.time
        });
      }
    });

    this.level = new Level({
      onClick: (row, column, mine, flag, difficulty) => {
        const time = this.myTimer();
        const data = { row, column, mine, flag, time };
        this.difficulty = difficulty;
        this.table.setState(data);
        this.count.setState(mine, flag);
      }
    });

    this.loading = new Loading({});

    this.count = new Count({
      mine: 10,
      flag: 10,
      onLoadData: () => {
        const database = firebase.database();
        const data = database.ref("user/");
        const array = [];
        this.loading.setState(true);
        data.on("child_added", element => {
          // console.log(element.val());
          array.push(element.val());
        });
        errorCheck.isData(array);
        this.loading.setState(false);
        return array;
      }
    });

    this.init();
  }

  init() {
    this.table.render();
  }
}

export default App;
