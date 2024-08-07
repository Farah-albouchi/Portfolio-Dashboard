const express = require('express');
const multer = require('multer');
const path = require('path');
const { Partner } = require('../models/partnersModel');
const { verifyToken } = require('../middlewares/verifyToken');
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); 
    }
});

const upload = multer({ storage: storage });


router.get("/",verifyToken,  async (req, res) => {
    try {
        const partners = await Partner.find({ userId: req.user.id });
        res.status(200).json(partners);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
router.get("/:userId",  async (req, res) => {
    try {
        const partners = await Partner.find({ userId: req.params.userId });
        res.status(200).json(partners);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.put('/', verifyToken, upload.single('image'), async (req, res) => {
    try {
        console.log(req.body); 
        console.log(req.file); 
        if (!req.file) {
            return res.status(400).json({ message: 'Image file is required' });
        }
        const userId = req.user.id;
        const { PartnerName } = req.body;
        const image = req.file ? req.file.path : '';

        const partner = new Partner({
            userId,
            PartnerName,
            image,
        });

        const result = await partner.save();
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


router.delete('/:name', async (req, res) => {
    try {
        const { name } = req.params;
        const result = await Partner.findOneAndDelete({ PartnerName: name });
        if (!result) {
            return res.status(404).json({ message: 'Partner not found' });
        }
        res.status(200).json({ message: 'Partner deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
