const express = require("express");
const app = express();
const port = 8080;

const cors = require("cors");

app.use(cors());
app.use(express.json());

const dotenv = require("dotenv");
dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

// 1. mongoose 모듈 가져오기
const mongoose = require("mongoose");

// 2. DB 세팅
mongoose.connect(MONGO_URL);

// 3. 연결된 DB tkdyd
const db = mongoose.connection;

// 4. 연결 실패
db.on("error", () => {
  console.log("connection failed!");
});

// 5. 연결 성공
db.once("open", () => {
  console.log("connected!");
});

// 6. Schema 생성
const bookedSchema = new mongoose.Schema({
  room: "string",
  username: "string",
  phoneNumber: "number",
  payment: "number",
  startDate: "string",
  endDate: "string",
  headcount: { adults: "number", children: "number" },
  price: "number",
  img: "string",
});

// 7. 정의된 스키마를 객체처럼 사용할 수 있도록 model() 함수로 컴파일
const Booked = mongoose.model("Schema", bookedSchema);

// 8. Booked 객체를 new 로 생성해서 값을 입력

app.post("/booked", (req, res) => {
  const newBooked = new Booked({
    room: req.body.room,
    username: req.body.username,
    phoneNumber: req.body.phoneNumber,
    payment: req.body.payment,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    headcount: req.body.headcount,
    price: req.body.price,
    img: req.body.img,
  });

  // 9. 데이터 저장
  newBooked.save(function (error, data) {
    if (error) {
      console.log(error);
    } else {
      console.log(data);
    }
  });
});

app.get("/booked", (req, res) => {
  Booked.find((err, books) => {
    if (err) return res.status(500).send({ error: "database failure" });
    res.json(books);
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
