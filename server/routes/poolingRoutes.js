const express = require('express');
const bookingModal = require('../modals/carBooking');
const router = express.Router();

require('../modals/LoginModal');
require('../modals/carModal');


router.get('/booked', async (req, res) => {
  try {
    const { startLocation, endLocation, startDate } = req.query;

    if (!startLocation || !endLocation || !startDate) {
      return res.status(400).json({ message: 'Start location, end location, and date are required' });
    }

    
    const startOfDay = new Date(`${startDate}T00:00:00.000Z`);
    const endOfDay = new Date(`${startDate}T23:59:59.999Z`);

    // Use regex for case-insensitive location matching
    const rides = await bookingModal.find({
      startLocation: { $regex: new RegExp(startLocation, 'i') },
      endLocation: { $regex: new RegExp(endLocation, 'i') },
      'bookedTimeSlot.startDate': { $gte: startOfDay, $lte: endOfDay },
      pooling:true
    })
    .populate({
      path: 'user',
      select: 'name email'  
    })
    .populate({
      path: 'car',
      select: 'name model' 
    });

    console.log(rides);
    res.json(rides);
  } catch (error) {
    console.error('❌ Error fetching rides:', error.message);
    res.status(500).json({ message: 'Error fetching rides' });
  }
});

module.exports = router;
