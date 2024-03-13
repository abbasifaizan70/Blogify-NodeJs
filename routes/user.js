const { Router } = require("express");
const User = require("../models/user");

const userRoute = Router();

userRoute.get("/signin", (req, res) => {
  return res.render("signin");
});

userRoute.get("/signup", (req, res) => {
  return res.render("signup");
});

userRoute.get("/logout", (req, res) => {
  res.clearCookie('token').redirect('/')
});

userRoute.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("signin", { error: "Incorrect email or password" });
  }
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
