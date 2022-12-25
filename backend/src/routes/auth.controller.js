const router = require("express").Router();
const User = require("../models/User.model.js");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// REGISTER
router.post("/register", async (req, res) => {
  // Validate request

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(420).json({ error: "Input field can not be empty" });
  }

  try {
    const emailExist = await User.findOne({ email: email });

    if (emailExist) {
      return res.status(420).json({ error: "Email already exist" });
    }
    const newUser = new User({
      email,
      password: bcrypt.hashSync(password, 11),
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err.message);
  }
});
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).json({ error: "User does not exist" });
    let wrongCountP = user.wrongPasswordCount;
    let updatedAtT = user.updatedAt;

    let updatedAtDate = new Date(updatedAtT).getDate();
    let UpdatedAtTime =
      new Date(updatedAtT).getHours() * 60 + new Date(updatedAtT).getMinutes();
    let currentDate = new Date().getDate();
    let currentTime = new Date().getHours() * 60 + new Date().getMinutes();
    let DateDiff = Math.abs(updatedAtDate - currentDate);
    let Today = new Date(updatedAtT);
    let Tomorrow = Today.setDate(Today.getDate() + 1);

    let resumetime =
      new Date(Tomorrow).toLocaleTimeString("en-US", {
        hour12: false,
      }) +
      " " +
      new Date(Tomorrow).toLocaleDateString();
    if (
      (wrongCountP === 5 && DateDiff === 0) ||
      (wrongCountP === 5 && DateDiff === 1 && currentTime < UpdatedAtTime)
    ) {
      return res.status(401).json({
        error: `Your account has been suspended for 24 hours. It will resume at ${resumetime}`,
      });
    }
    if (
      (wrongCountP === 5 && DateDiff > 1) ||
      (wrongCountP === 5 && DateDiff === 1 && currentTime >= UpdatedAtTime)
    ) {
      await User.updateOne(
        { email: user.email },
        { $set: { wrongPasswordCount: 0 } }
      );

      return res.status(401).json({
        error: "Your account has been continued! Please try again to login",
      });
    }
    const validPassword = bcrypt.compareSync(req.body.password, user.password);
    console.log(validPassword);

    if (!validPassword) {
      await User.updateOne(
        { email: user.email },
        { $set: { wrongPasswordCount: user.wrongPasswordCount + 1 } }
      );

      return res.status(401).json({ error: "Wrong Email/Password" });
    }

    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "3h",
    });
    const { password, ...others } = user._doc;
    res.status(200).json({ accessToken, ...others });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
