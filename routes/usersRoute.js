const express = require("express");
const router = express.Router();
const User = require("../models/user");
const user = require("../models/user");

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
    const user = await User.findById(req.params.id);
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

router.patch("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (req.body.email) {
      user.email = req.body.email;
    }
    if (req.body.name) {
      user.name = req.body.name;
    }
    if (req.body.city) {
      user.city = req.body.city;
    }
    if (req.body.age) {
      user.age = req.body.age;
    }

    const data = await user.save();
    res.json(data);
  } catch (error) {
    console.log(`Errors: ${error}`);
  }
});

module.exports = router;
