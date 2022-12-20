const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");

//REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    lastName: req.body.lastName,
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PWD_SECRET
    ).toString(),
  });
  try {
    const savedUser = await newUser.save();
    return res.status(201).json(savedUser);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// //LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(401).json("Wrong credentials!");
    } else {
      const unhash = CryptoJS.AES.decrypt(
        user.password,
        process.env.PWD_SECRET
      );
      const orginalPwd = unhash.toString(CryptoJS.enc.Utf8);
      if (orginalPwd !== req.body.password) {
        res.status(401).json("Wrong credentials!");
      } else {
        const { password, ...others } = user._doc;
        return res.status(200).json(others);
      }
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
