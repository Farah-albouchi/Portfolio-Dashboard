const express = require('express');
const router = express.Router();
const {Project} = require('../models/projectModel');
const {ProjectPart} = require('../models/ProjectPart');
const Joi = require('joi');
const { verifyToken } = require("../middlewares/verifyToken");
const fs = require('fs');
const multer = require('multer');
const path = require('path');

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
      cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); 
    }
  });
  
  const upload = multer({ storage: storage });

router.get("/", verifyToken, async (req, res) => {
    try {
        const ProjectsPart = await ProjectPart.findOne({ userId: req.user.id }).populate('Projects');
        if (!ProjectsPart) {
            return res.status(404).json({ message: "No Projects found" });
        }
        res.status(200).json(ProjectsPart);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get("/:userId", async (req, res) => {
  try {
      const ProjectsPart = await ProjectPart.findOne({ userId: req.params.userId}).populate('Projects');
      if (!ProjectsPart) {
          return res.status(404).json({ message: "No Projects found" });
      }
      res.status(200).json(ProjectsPart);
  } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/", verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        let Part = await ProjectPart.findOne({ userId: req.user.id });
        if (!Part) {
            const { title } = req.body;
            const newProjectPart = new ProjectPart({
                userId,
                title,
               
            });
            const result = await newProjectPart.save();
            res.status(201).json(result);
        } else {
            if (req.body.title !== undefined) Part.title = req.body.title;
            const result = await Part.save();
            res.status(201).json(result);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.post("/type", verifyToken, async (req, res) => {
    try {
        const { type } = req.body;
        let Part = await ProjectPart.findOne({ userId: req.user.id });
        
        if (Part.types.includes(type)) {
            return res.status(400).json({ message: "Type already exists" });
        }
        Part.types.push(type);
        const result = await Part.save();

        res.status(201).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.post("/Newproject", verifyToken , upload.single('image'), async (req, res) => {
    try {
        const { name, type} = req.body;
        const img = "http://localhost:3000/" + req.file.path.replace(/\\/g, '/');
        const image = req.file ? img : undefined;
        const newproj = new Project({
            name,
            type,
            image
        });
        const savedproj = await newproj.save();

        let Proj = await ProjectPart.findOne({ userId: req.user.id });
        Proj.Projects.push(savedproj._id);
        const result = await Proj.save();
        res.status(201).json(savedproj);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


router.delete("/type/:index", verifyToken, async (req, res) => {
  try {
    const { index } = req.params;
    const part = await ProjectPart.findOne({ userId: req.user.id });
    if (!part) {
      return res.status(404).json({ message: "ProjectPart section not found" });
    }

    if (index < 0 || index >= part.types.length) {
      return res.status(400).json({ message: "Invalid type index" });
    }

    const typeName = part.types[index]; 
    await Project.deleteMany({ type: typeName }); 

    part.types.splice(index, 1); 
    await part.save(); 
    res.status(204).json(); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

  router.delete("/NewProject/:index", verifyToken, async (req, res) => {
    try {
      const { index } = req.params;
      const part = await ProjectPart.findOne({ userId: req.user.id });
      if (!part) {
        return res.status(404).json({ message: "Services section not found" });
      }
  
      if (index < 0 || index >= part.Projects.length) {
        return res.status(400).json({ message: "Invalid service index" });
      }
  
      const ProjectId = part.Projects[index];
  
      part.Projects.splice(index, 1);
  
      await Project.findByIdAndDelete(ProjectId);
  
      await part.save();
  
      res.status(204).json();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  
  
module.exports = router;
