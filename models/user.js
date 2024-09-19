const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    min: 0,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures no duplicate emails
    match: /.+\@.+\..+/, // Basic regex for email validation
  },
  city: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
