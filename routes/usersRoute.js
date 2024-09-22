const express = require("express");
const router = express.Router();
const User = require("../models/user");
const user = require("../models/user");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     description: Retrieve a list of users from the database.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   age:
 *                     type: integer
 *                   email:
 *                     type: string
 *                   city:
 *                     type: string
 */

router.get("/", async (req, res) => {
  console.log("Get Users requested");
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.log(`Errors: ${error}`);
  }
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retrieve a single user
 *     description: Get a single user by ID.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The user ID.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 age:
 *                   type: integer
 *                 email:
 *                   type: string
 *                 city:
 *                   type: string
 */

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(404).send("error :" + error);
  }
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user in the database.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *               email:
 *                 type: string
 *               city:
 *                 type: string
 *     responses:
 *       200:
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 age:
 *                   type: integer
 *                 email:
 *                   type: string
 *                 city:
 *                   type: string
 */

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

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Update an existing user
 *     description: Update a user by ID.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The user ID.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *               email:
 *                 type: string
 *               city:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 age:
 *                   type: integer
 *                 email:
 *                   type: string
 *                 city:
 *                   type: string
 */

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
