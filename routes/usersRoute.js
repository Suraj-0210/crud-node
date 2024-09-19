const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.log(`Errors: ${error}`);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const users = await User.findById(req.params.id);
    res.json(users);
  } catch (error) {
    console.log(`Errors: ${error}`);
  }
});

router.post("/", async (req, res) => {
  const user = new User({
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
    city: req.body.city,
  });

  try {
    const data = await user.save();
    res.json(data);
  } catch (error) {
    console.log(error);
    res.json(error.errmsg);
  }
});

module.exports = router;
