const express = require('express');
const Car = require('../modals/carModal');

const router = express.Router();

router.get('/getAllCars', async (req, res) => {
    try {
        const cars = await Car.find();
        res.json(cars);
    } catch (error) {
        console.error("Error fetching cars:", error);
        res.status(500).json({ message: 'Error finding data', error });
    }
});

router.post('/addCar', async (req, res) => {
    try {
        const newCar = new Car(req.body);
        await newCar.save();
        res.json({ message: "Car added successfully", car: newCar });
    } catch (error) {
        res.status(500).json({ message: "Error adding car", error });
    }
});

module.exports = router;
