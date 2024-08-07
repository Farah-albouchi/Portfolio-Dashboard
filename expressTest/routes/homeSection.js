const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { Home } = require('../models/homeModel');
const Joi = require('joi');
const fs = require('fs');
const { verifyToken } = require("../middlewares/verifyToken");


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

router.get("/",verifyToken, async (req, res) => {
  try {
    const userId = req.user.id ;
    const home = await Home.findOne({ userId: userId });
    if (!home) {
      return res.status(404).json({ message: "Home section not found" });
    }
    res.status(200).json(home);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId ;
    const home = await Home.findOne({ userId: userId });
    if (!home) {
      return res.status(404).json({ message: "Home section not found" });
    }
    res.status(200).json(home);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.put("/",verifyToken, upload.fields([{ name: 'image', maxCount: 1 }, { name: 'CV', maxCount: 1 }]), async (req, res) => {

  try {
    const userId = req.user.id ;
    const home = await Home.findOne({ userId: userId });

    if (!home) {
      try {
        // const { error } = validateCreate(req.body);
        // if (error) {
        //   return res.status(400).json({ message: error.details[0].message });
        // }
        const { job, description } = req.body;
        const image = req.files.image ? req.files.image[0].path : '';
        const CV = req.files.CV ? req.files.CV[0].path : '';
        const newHome = new Home({
          userId,
          job,
          description,
          image,
          CV,
        });

        const result = await newHome.save();
        res.status(200).json(result);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    } else {
      const prevImage = home.image;
      const prevCV = home.CV;
      if (req.body.job !== undefined) {
        home.job = req.body.job;
      }
      if (req.body.description !== undefined) {
        home.description = req.body.description;
      }
      if (req.files?.image) {
        home.image = "http://localhost:3000/" + req.files.image[0].path.replace(/\\/g, '/');
        if (prevImage) {
          deleteFileByName(prevImage);
        }
      }
      if (req.files?.CV) {
        home.CV = "http://localhost:3000/" + req.files.CV[0].path.replace(/\\/g, '/');
        if (prevCV) {
          deleteFileByName(prevCV);
        }
      }

      const result = await home.save();
      res.status(200).json(result);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


router.delete("/", async (req, res) => {
  try {
    const home = await Home.findOne();
    if (!home) {
      return res.status(404).json({ message: "Home section not found" });
    }

    await Home.findOneAndDelete();
    res.status(204).json();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/", upload.fields([{ name: 'image', maxCount: 1 }, { name: 'CV', maxCount: 1 }]), async (req, res) => {
  try {
    const { error } = validateCreate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { job, description, userId } = req.body;
    const image = req.files.image ? req.files.image[0].path : '';
    const CV = req.files.CV ? req.files.CV[0].path : '';
    const home = new Home({
      userId,
      job,
      description,
      image,
      CV,
    });

    const result = await home.save();
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

function validateCreate(obj) {
  const schema = Joi.object({
    userId: Joi.string().required(),
    job: Joi.string().required().trim(),
    description: Joi.string().allow(''),
  });
  return schema.validate(obj);
}

function validateUpdate(obj) {
  const schema = Joi.object({
    job: Joi.string().trim(),
    description: Joi.string().allow(''),
  });
  return schema.validate(obj);
}

module.exports = router;
