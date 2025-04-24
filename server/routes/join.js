const express = require('express');
const bookingModal = require('../modals/carBooking');
const router = express.Router();
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

// Setup Nodemailer transporter (Gmail example)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'puripratham11@gmail.com',        
    pass: 'cnqo ujaw rnli fvpy',   
  },
});

// POST: Join a ride by ride ID
router.post('/join/:id', async (req, res) => {
  try {
    const rideId = req.params.id;
    const { userId, email: userEmail } = req.body; 
    console.log(userEmail);

    if (!mongoose.Types.ObjectId.isValid(rideId)) {
      return res.status(400).json({ message: 'Invalid ride ID' });
    }

    // Populate user and car details
    const ride = await bookingModal.findById(rideId)
      .populate('user', 'name email')
      .populate('car', 'name model');

    if (!ride) {
      return res.status(404).json({ message: 'Ride not found' });
    }

    if (!ride.passengers) {
      ride.passengers = [];
    }

    if (ride.passengers.includes(userId)) {
      return res.status(400).json({ message: 'You have already joined this ride' });
    }

    if (ride.seatsAvailable <= 0) {
      return res.status(400).json({ message: 'No available seats on this ride' });
    }

    ride.passengers.push(userId);
    ride.seatsAvailable -= 1;
    await ride.save();

    // Send email notification to ride owner
    const mailOptions = {
      from: userEmail, 
      subject: 'Someone joined your carpool ride',
      text: `Hi ${ride.user.name},\n\nA user has joined your carpool ride from ${ride.startLocation} to ${ride.endLocation}.\n\nRide Details:\n- Date: ${new Date(ride.bookedTimeSlot.startDate).toLocaleString()}\n- Car: ${ride.car.name} (${ride.car.model})\n\nThanks for using our service!\n\nCar Pooling System`,
    };
    console.log(ride.user.email);

    try {
      await transporter.sendMail(mailOptions);
      console.log(`✅ Email sent to ${ride.user.email}`);
    } catch (emailErr) {
      console.error(`❌ Failed to send email to ${ride.user.email}:`, emailErr);
    }

    res.status(200).json({ message: 'Joined the ride successfully', ride });

  } catch (error) {
    console.error('Error joining ride:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
