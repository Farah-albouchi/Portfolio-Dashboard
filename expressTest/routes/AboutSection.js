const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { About } = require('../models/AboutModel');
const Joi = require('joi');
const { verifyToken } = require("../middlewares/verifyToken");
const {Skill} = require('../models/skillsModel');
const fs = require('fs');

function deleteFileByName(fileName) {
  const filePath = path.join(__dirname, 'uploads', fileName);

  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(`Error deleting file ${fileName}:`, err);
    } else {
      console.log(`File ${fileName} was deleted successfully`);
    }
  });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); 
  }
});

const upload = multer({ storage: storage });

router.post('/skills',verifyToken, async (req, res) => {
  try {
    const { name, progress } = req.body;
    const skill = new Skill({ name, progress });
    const savedSkill = await skill.save();

    const about = await About.findOne({ userId: req.user.id });

    about.skills.push(savedSkill._id);
    const updatedAbout = await about.save();

    res.status(201).json(savedSkill);
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal Server Error");
  }
});
router.post('/awards',verifyToken, async (req, res) => {
  try {
    const {description} = req.body;

    const about = await About.findOne({ userId: req.user.id });
    about.awards.push(description);
    const updatedAbout = await about.save();
    console.log(updatedAbout);
    res.status(201).json(updatedAbout);
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal Server Error");
  }
});
router.post('/education',verifyToken, async (req, res) => {
  try {
    const {description }= req.body;

    const about = await About.findOne({ userId: req.user.id });
    about.education.push(description);
    const updatedAbout = await about.save();
    res.status(201).json(updatedAbout);
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal Server Error");
  }
});
router.get("/",verifyToken, async (req, res) => {
  try {
    const about = await About.findOne({ userId: req.user.id }).populate('skills');
    if (!about) {
      return res.status(404).json({ message: 'About section not found' });
    }
    res.status(200).json(about);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const about = await About.findOne({ userId: req.params.userId }).populate('skills');
    if (!about) {
      return res.status(404).json({ message: 'About section not found' });
    }
    res.status(200).json(about);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post("/", verifyToken, upload.single('image'), async (req, res) => {
  try {
    // Parse JSON fields
    const {  awards, education } = req.body;
    // req.body.skills = skills ? JSON.parse(skills) : new Map();
    req.body.awards = awards ? JSON.parse(awards) : [];
    req.body.education = education ? JSON.parse(education) : [];

    // const { error } = validateCreate(req.body);
    // if (error) {
    //   return res.status(400).json({ message: error.details[0].message });
    // }

    const userId = req.user.id;
    const { title,title2, description } = req.body;
    const image = req.file ? req.file.path : undefined;

    const about = new About({
      userId,
      title,
      title2,
      description,
      image,
      // skills: new Map(Object.entries(req.body.skills)),
      awards: req.body.awards,
      education: req.body.education
    });

    const result = await about.save();
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


router.delete("/award/:index", verifyToken, async (req, res) => {
  try {
    const { index } = req.params;


    const about = await About.findOne({ userId: req.user.id });
    if (!about) {
      return res.status(404).json({ message: "About section not found" });
    }

    if (index < 0 || index >= about.awards.length) {
      return res.status(400).json({ message: "Invalid award index" });
    }

    about.awards.splice(index, 1);

  
    await about.save();

    res.status(204).json();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.delete("/education/:index", verifyToken, async (req, res) => {
  try {
    const { index } = req.params;


    const about = await About.findOne({ userId: req.user.id });
    if (!about) {
      return res.status(404).json({ message: "About section not found" });
    }

    if (index < 0 || index >= about.education.length) {
      return res.status(400).json({ message: "Invalid education index" });
    }

    about.education.splice(index, 1);
    await about.save();
    res.status(204).json();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.delete("/skills/:index", verifyToken, async (req, res) => {
  try {
    const { index } = req.params;
    
   
    const about = await About.findOne({ userId: req.user.id });
    if (!about) {
      return res.status(404).json({ message: "About section not found" });
    }

    if (index < 0 || index >= about.skills.length) {
      return res.status(400).json({ message: "Invalid skill index" });
    }

    const skillId = about.skills[index];

    about.skills.splice(index, 1);

    await Skill.findByIdAndDelete(skillId);

    await about.save();

    res.status(204).json();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/", verifyToken, upload.single('image'), async (req, res) => {
  try {
    const userId = req.user.id;
    let about = await About.findOne({ userId });

    if (about) {
      if (req.body.title !== undefined ) about.title = req.body.title;
      if (req.body.title2 !== undefined) about.title2 = req.body.title2;
      if (req.body.description !== undefined) about.description = req.body.description;
      if (req.file) {
        const prevImage = about.image;
        about.image = "http://localhost:3000/" + req.file.path.replace(/\\/g, '/');
        if (prevImage) {
          deleteFileByName(prevImage);
        }
      }

    await about.save();
      res.status(200).json(about);
    } else {

      const { title, title2, description } = req.body;
      const img = "http://localhost:3000/" + req.file.path.replace(/\\/g, '/');
      const image = req.file ? img : undefined;
      const awards = req.body.awards ? JSON.parse(req.body.awards) : [];
      const education = req.body.education ? JSON.parse(req.body.education) : [];

      about = new About({
        userId,
        title,
        title2,
        description,
        image,
        awards,
        education
      });

      await about.save();
      res.status(200).json(about);
    }
  } catch (error) {
    console.log("Error updating About section:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

  
  function validateCreate(skill) {
    const schema = Joi.object({
      name: Joi.string().required().trim(),
      progress: Joi.number().required().min(0).max(100),
    });
    return schema.validate(skill);
  }
  function validateAboutCreate(about) {
    const schema = Joi.object({
    
      title: Joi.string().required().trim(),
      description: Joi.string().allow('').optional(),
      image: Joi.string().allow('').optional(),
      awards: Joi.array().items(Joi.string().allow('')).optional(),
      education: Joi.array().items(Joi.string().allow('')).optional(),
    });
    return schema.validate(about);
  }
  

  function validateUpdate(obj) {
    const schema = Joi.object({
      title: Joi.string().trim(),
      description: Joi.string(),
      image: Joi.string(),
    });
    return schema.validate(obj);
  }
module.exports = router;
