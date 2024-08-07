const express = require("express");
const router = express.Router();
const {User,validateLoginUser,validateRegisterUser,validateUpdateUser} = require('../models/userModel');
const bcrypt = require("bcryptjs");
const { verifyToken } = require("../middlewares/verifyToken");

router.put("/", verifyToken, async (req, res) => {
  console.log(req.user.id);
 
  // const { error } = validateUpdateUser(req.body);
  // if (error) {
  //   return res.status(400).json({ message: error.details[0].message });
  // }
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }
  
  const updateUser = await User.findByIdAndUpdate(
   req.user.id,
    {
      $set: {
        email: req.body.email,
        password: req.body.password,
        Firstname: req.body.Firstname,
        Lastname: req.body.Lastname,
        phone: req.body.phone,
        address: req.body.address,
        LinkedIN: req.body.linkedin,
        FBlink: req.body.fb,
        INSTAlink: req.body.insta,
        workingHoures:req.body.workingHours
      },
    },
    { new: true }
  ).select("-password");

  res.status(200).json(updateUser);
});

router.get("/LoadUser",verifyToken,async (req,res)=> {
 try {
   const user = await User.findById(req.user.id).select("-password");
   res.status(200).json(user);
 } catch (error) {
   res.status(500).json({ message: error.message });
 }
})
router.get("/LoadUser/:userId",async (req,res)=> {
  try {
    const user = await User.findById(req.params.userId).select("-password");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
 })
module.exports = router;
