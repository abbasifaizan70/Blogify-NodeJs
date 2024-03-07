const { Router } = require("express");
const User = require("../models/user");

const userRoute = Router();

userRoute.get("/signin", (req, res) => {
  return res.render("signin");
});

userRoute.get("/signup", (req, res) => {
  return res.render("signup");
});

userRoute.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const user = User.matchPassword(email, password);

  console.log('user', user)

  return res.redirect("/");
});

userRoute.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;

  await User.create({
    fullName,
    email,
    password
  });

  return res.redirect("/");
});

module.exports = userRoute;
