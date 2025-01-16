const express = require("express");
const router = express.Router();

const { login, signup } = require("../controller/user");
/*
    2 routes:
    POST /login
    POST /signup
*/

// login route
router.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    // login user via login function
    const user = await login( email, password);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
});

// signup route
router.post("/signup", async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    // create new user via signup function
    const user = await signup(name, email, password);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
});

module.exports = router;
