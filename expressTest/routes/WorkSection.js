const express = require('express');
const router = express.Router();
const {Achievement} = require('../models/AchievementModel');
const {WorkPart} = require('../models/WorkPartModel');
const Joi = require('joi');
const { verifyToken } = require("../middlewares/verifyToken")

router.get("/", verifyToken, async (req, res) => {
    try {
        const AchievementsPart = await WorkPart.findOne({ userId: req.user.id }).populate('Achievements');
        if (!AchievementsPart) {
            return res.status(404).json({ message: "No Achievements found" });
        }
        res.status(200).json(AchievementsPart);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get("/:userId",  async (req, res) => {
    try {
        const AchievementsPart = await WorkPart.findOne({ userId: req.params.userId}).populate('Achievements');
        if (!AchievementsPart) {
            return res.status(404).json({ message: "No Achievements found" });
        }
        res.status(200).json(AchievementsPart);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.put("/", verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        let workPart = await WorkPart.findOne({ userId: req.user.id });
        if (!workPart) {
            const { title} = req.body;
            const newWorkPart = new WorkPart({
                userId,
                title,
            });
            const result = await newWorkPart.save();
            res.status(201).json(result);
        } else {
            if (req.body.title !== undefined) workPart.title = req.body.title;
            const result = await workPart.save();
            res.status(201).json(result);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.post("/achievement", verifyToken, async (req, res) => {
    try {
        const { value, description } = req.body;
        const newAchievement = new Achievement({
            value,
            description,
        });

        const savedAchievement = await newAchievement.save();

        let Work = await WorkPart.findOne({ userId: req.user.id });
        Work.Achievements.push(savedAchievement._id);
        const result = await Work.save();
        res.status(201).json(savedAchievement);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.delete("/achievement/:index", verifyToken, async (req, res) => {
    try {
      const { index } = req.params;
      const part = await WorkPart.findOne({ userId: req.user.id });
      if (!part) {
        return res.status(404).json({ message: "Services section not found" });
      }
  
      if (index < 0 || index >= part.Achievements.length) {
        return res.status(400).json({ message: "Invalid service index" });
      }
  
      const achievementId = part.Achievements[index];
  
      part.Achievements.splice(index, 1);
  
      await Achievement.findByIdAndDelete(achievementId);
  
      await part.save();
  
      res.status(204).json();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  
module.exports = router;
