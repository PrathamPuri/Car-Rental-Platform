const express = require('express');
const bookingModal = require('../modals/carBooking');  // Correct import
const router = express.Router();

require('../modals/LoginModal');
require('../modals/carModal')


// GET: Fetch rides based on start location, end location, and start date
router.get('/booked', async (req, res) => {
  try {
    const { startLocation, endLocation, startDate } = req.query;

    // Check if all required fields are present
    if (!startLocation || !endLocation || !startDate) {
      return res.status(400).json({ message: 'Start location, end location, and date are required' });
    }

    // Parse startDate as a Date object to perform proper date comparison
    const startOfDay = new Date(`${startDate}T00:00:00.000Z`);
    const endOfDay = new Date(`${startDate}T23:59:59.999Z`);

    // Use regex for case-insensitive location matching
    const rides = await bookingModal.find({
      startLocation: { $regex: new RegExp(startLocation, 'i') },
      endLocation: { $regex: new RegExp(endLocation, 'i') },
      'bookedTimeSlot.startDate': { $gte: startOfDay, $lte: endOfDay },
    })
    .populate({
      path: 'user',
      select: 'name email'  // Select the fields you want from user
    })
    .populate({
      path: 'car',
      select: 'carName modelNumber'  // Select the fields you want from car
    });


    res.json(rides);
  } catch (error) {
    console.error('❌ Error fetching rides:', error.message);
    res.status(500).json({ message: 'Error fetching rides' });
  }
});

module.exports = router;
