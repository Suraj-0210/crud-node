const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.MONGO;
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

mongoose.connect(url, { useNewUrlParser: true });
const con = mongoose.connection;
con.on("open", function () {
  console.log("Database is connected..");
});

const userRouter = require("./routes/usersRoute");
app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
