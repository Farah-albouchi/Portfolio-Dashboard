const express = require("express");
const router = express.Router();
const { Message } = require("../models/MessageModel");

const Joi = require("joi");
const { verifyToken } = require("../middlewares/verifyToken");

router.get("/", verifyToken, async (req, res) => {
  try {
    const msg = await Message.find({ userId: req.user.id });
    if (!msg) {
      return res.status(404).json({ message: "No messages found" });
    }
    res.status(200).json(msg);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/:userId",  async (req, res) => {
  try {
    const { Name, object, Text, email , date } = req.body;
    const userId = req.params.userId;
    const newMessage = new Message({
      userId,
      Name,
      email,
      object,
      Text,
      date
    });

    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    const msg =  await Message.findByIdAndDelete(id);
   
    res.status(204).json();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


function validateCreate(obj) {
  const schema = Joi.object({
    title: Joi.string().required().trim(),
    description: Joi.string(),
  });
  return schema.validate(obj);
}

function validateUpdate(obj) {
  const schema = Joi.object({
    title: Joi.string().trim(),
    description: Joi.string(),
  });
  return schema.validate(obj);
}

module.exports = router;
