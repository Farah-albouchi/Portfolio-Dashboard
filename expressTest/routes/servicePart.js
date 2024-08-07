const express = require("express");
const router = express.Router(); 
const { ServicePart } = require('../models/servicePartModel'); 
const { Service } = require('../models/servicesModel'); // Correctly import the Service model
const Joi = require('joi');
const { verifyToken } = require("../middlewares/verifyToken");

router.get("/", verifyToken, async (req, res) => {
    try {
        const servicesPart = await ServicePart.findOne({ userId: req.user.id }).populate('services');
        if (!servicesPart) {
            return res.status(404).json({ message: "No services found" });
        }
        res.status(200).json(servicesPart);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
router.get("/:userId", async (req, res) => {
    try {
        const servicesPart = await ServicePart.findOne({ userId: req.params.userId }).populate('services');
        if (!servicesPart) {
            return res.status(404).json({ message: "No services found" });
        }
        res.status(200).json(servicesPart);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.put("/", verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        let servicePart = await ServicePart.findOne({ userId: req.user.id });
        if (!servicePart) {
            const { title,title2, description } = req.body;
            const newServicePart = new ServicePart({
                userId,
                title,
                title2,
                description,
            });
            const result = await newServicePart.save();
            res.status(201).json(result);
        } else {
            if (req.body.title !== undefined) servicePart.title = req.body.title;
            if (req.body.title2 !== undefined) servicePart.title2 = req.body.title2;
            if (req.body.description !== undefined) servicePart.description = req.body.description;
            const result = await servicePart.save();
            res.status(201).json(result);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.post("/service", verifyToken, async (req, res) => {
    try {
        const { title, description } = req.body;
        const newService = new Service({
            title,
            description,
        });

        const savedService = await newService.save();

        let servicePart = await ServicePart.findOne({ userId: req.user.id });
        servicePart.services.push(savedService._id);
        const result = await servicePart.save();
        res.status(201).json(savedService);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
router.delete("/services/:index", verifyToken, async (req, res) => {
  try {
    const { index } = req.params;
    
   
    const part = await ServicePart.findOne({ userId: req.user.id });
    if (!part) {
      return res.status(404).json({ message: "Services section not found" });
    }

    if (index < 0 || index >= part.services.length) {
      return res.status(400).json({ message: "Invalid service index" });
    }

    const serviceId = part.services[index];

    part.services.splice(index, 1);

    await Service.findByIdAndDelete(serviceId);

    await part.save();

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
