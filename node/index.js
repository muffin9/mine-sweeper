const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "dpfmsk20",
  database: "minedb"
});

connection.connect();

app.post("/user", (req, res) => {
  const nickname = req.body.nickname;
  const time = req.body.time;

  connection.query(
    "INSERT INTO user (nickname,time) VALUES ('" +
      nickname +
      "', '" +
      time +
      "')",
    (error, result, fields) => {
      if (error) {
        res.send("error : " + error);
      } else {
        console.log(nickname + ", " + time);
        res.json(200, {
          result: `success create nickname & time" + ${nickname} + ${time}`
        });
      }
    }
  );
});

app.listen(4000, function() {
  console.log("server starting with 4000");
});
