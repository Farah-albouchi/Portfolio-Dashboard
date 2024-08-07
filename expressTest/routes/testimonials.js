const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { Testimonials } = require('../models/testimonialsModel');
const { verifyToken } = require("../middlewares/verifyToken");
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

router.get("/", verifyToken, async (req, res) => {
  try {
    const tes = await Testimonials.find({ userId: req.user.id });
    if (!tes) {
      return res.status(404).json({ message: 'Testimonials section not found' });
    }
    res.status(200).json(tes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
router.get("/:userId", async (req, res) => {
  try {
    const tes = await Testimonials.find({ userId: req.params.userId});
    if (!tes) {
      return res.status(404).json({ message: 'Testimonials section not found' });
    }
    res.status(200).json(tes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post("/", verifyToken, upload.single('image'), async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, description, job, review } = req.body;
        const image = req.file ? "http://localhost:3000/" + req.file.path.replace(/\\/g, '/') : undefined;
  
        tes = new Testimonials({
          userId,
          name,
          description,
          image,
          job,
          review
        });
  
        await tes.save();
        res.status(200).json(tes);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  

router.put("/:id", verifyToken, upload.single('image'), async (req, res) => {
  try {
  
    let tes = await Testimonials.findById(req.params.id);
    if (!tes) {
        return res.status(404).json({ message: "Testimonial not found" });
      }
      if (req.body.name !== undefined) tes.name = req.body.name;
      if (req.body.review !== undefined) tes.review = req.body.review;
      if (req.body.job !== undefined) tes.job = req.body.job;
      if (req.body.description !== undefined) tes.description = req.body.description;
      if (req.file) {
        const prevImage = tes.image;
        tes.image = "http://localhost:3000/" + req.file.path.replace(/\\/g, '/');
        if (prevImage) {
          deleteFileByName(path.basename(prevImage));
        }
      }

      await tes.save();
      res.status(200).json(tes);
    
  } catch (error) {
    console.log("Error updating Testimonial section:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    const tes = await Testimonials.findByIdAndDelete(id);

    if (tes && tes.image) {
      deleteFileByName(path.basename(tes.image));
    }

    res.status(204).json();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
