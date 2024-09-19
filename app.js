const express = require("express");
const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/crudDB";
const PORT = 5000;

const app = express();

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
