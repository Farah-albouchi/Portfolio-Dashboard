const express = require("express");
const crypto = require("crypto");
const {
  User,
  validateLoginUser,
  validateRegisterUser,
  validateUpdateUser,
} = require("../models/userModel");
const sendVerificationEmail = require("../config/emails");
const bcrypt = require("bcryptjs");
const date = require("joi");
const { verifyOTPToken } = require("../middlewares/verifyToken");
const jwt = require("jsonwebtoken");

const router = express.Router();

const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); 
};


router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const code = generateVerificationCode();
  user.OTPcode = code;
  user.resetPasswordExpires = Date.now() + 3600000; 
  await user.save();
  sendVerificationEmail(email, code);

  res.status(200).json({ message: "Verification code sent to email" });
});

router.post("/verify-code", async (req, res) => {
  const { email, code } = req.body;
  const user = await User.findOne({ email });

  if (
    !user ||
    user.OTPcode !== code ||
    user.resetPasswordExpires < Date.now()
  ) {
    return res.status(400).json({ message: "Invalid or expired code" });
  }

  const token = jwt.sign({ id: user._id }, process.env.OTP_SECRET_KEY);
  res.status(200).json({token });
});


router.post("/NewPassword", verifyOTPToken, async (req, res) => {
  const { error } = validateUpdateUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const currentUser = await User.findById(req.user.id);
  const { password } = req.body;
  const b = await bcrypt.compare(password, currentUser.password);
  if (b) {
    return res
      .status(402)
      .json({ message: "Password is same as old password" });
  } else {
    const salt = await bcrypt.genSalt(10);
    const result = currentUser.save(
      (currentUser.prevPassword = currentUser.password),
      (currentUser.password = await bcrypt.hash(password, salt)),
      (currentUser.changedAt = Date.now())
    );
    console.log("hya");
    res.status(200).json({ message: "Password updated successfully" });
  }
});
module.exports = router;
