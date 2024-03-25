const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/user.route");

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MongoDb connected");
  })
  .catch((error) => console.log(error));

app.listen(port, () => {
  console.log("Server started :", port);
});


// 

app.use("api/users", userRouter)