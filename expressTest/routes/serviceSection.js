
const express = require('express');
const router = express.Router();
const {Service} = require('../models/servicesModel');
const {ServicePart} = require('../models/servicePartModel');
const Joi = require('joi');

router.get("/", async (req, res) => {
  try {
    const services = await Service.find();
    if (!services || services.length === 0) {
      return res.status(404).json({ message: "No services found" });
    }
    res.status(200).json(services);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/:title", async (req, res) => {
  try {
    const service = await Service.findOne({ title: req.params.title });
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json(service);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { error } = validateCreate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { title, description } = req.body;
    const service = new Service({
      title,
      description,
    });

    const result = await service.save();
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put('/:title', async (req, res) => {
  try {
    const { error } = validateUpdate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { title } = req.params;
   

    const services = await Service.findOne({ title: title });
    if (!services) {
      return res.status(404).json({ message: 'Service not found' });
    }
    services.title = req.body.title;
    services.description = req.body.description;
    const result = await services.save();
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.delete('/:title', async (req, res) => {
  try {
    const { title } = req.params;
    const result = await Service.findOneAndDelete({ title: title });
    if (!result) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

function validateCreate(obj) {
  const schema = Joi.object({
    title: Joi.string().required().trim(),
    description: Joi.string().required(),
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
