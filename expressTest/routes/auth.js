const express = require("express");
const router = express.Router();
const {User,validateLoginUser,validateRegisterUser,validateUpdateUser} = require('../models/userModel');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Registration route
router.post("/register", async (req, res) => {
  const { error } = validateRegisterUser(req.body);
  if (error) {
    return res.status(409).json({ message: error.details[0].message });
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ message: "This user is already registered" });
  }

  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);

  user = new User({
    email: req.body.email,
    Firstname: req.body.Firstname,
    Lastname: req.body.Lastname,
    password: req.body.password,
    address: req.body.address,
    phone: req.body.phone,
    FBlink: req.body.FBlink,
    INSTAlink: req.body.INSTAlink,
    LinkedIN: req.body.LinkedIN,
  });

  const result = await user.save();
  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET || "SecretKey"
  );

  console.log(token);
  res.status(201).json({ token });
});
function formatDate(date) {
  const options = { day: 'numeric', month: 'long' }; // Display day and month
  return date.toLocaleDateString('en-US', options);
}

// Login route
router.post("/login", async (req, res) => {
  const { error } = validateLoginUser(req.body);
  if (error) {
    return res.status(409).json({ message: error.details[0].message });
  }

  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({ message: "Invalid email " });
  }
  if(user.prevPassword)
{  const prevPasswordMatch =  bcrypt.compare(
    req.body.password,
    user.prevPassword
  );
  if(prevPasswordMatch) {
    const lastChanged = user.changedAt ? formatDate(user.changedAt) : "unknown";
      return res.status(422).json({ message: `This is an old password. Last change was on ${lastChanged}` });
    }
}


  const isPasswordMatch = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isPasswordMatch) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = jwt.sign(
    { id: user._id, Firstname: user.Firstname, Lastname: user.Lastname },
    process.env.JWT_SECRET_KEY
  );

  res.status(200).json({ token });
});

module.exports = router;
