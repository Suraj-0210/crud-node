const express = require("express");
const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/crudDB";

const app = express();

mongoose.connect(url, { useNewUrlParser: true });

const con = mongoose.connection;

con.on("open", function () {
  console.log("Database is connected..");
});
