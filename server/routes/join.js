const express = require('express');
const bookingModal = require('../modals/carBooking');
const router = express.Router();
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
require('dotenv').config();


// ✅ Setup Nodemailer transporter (Gmail example)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'process.env.EMAIL_USER',        
    pass: 'process.evn.EMAL_PASS',   // Use app password if using Gmail with 2FA
  },
});

// ✅ POST: Join a ride by ride ID
router.post('/join/:id', async (req, res) => {
  try {
    const rideId = req.params.id;
    const { userId, email: userEmail } = req.body; 
    console.log("Joining user email:", userEmail);

    // Validate ride ID
    if (!mongoose.Types.ObjectId.isValid(rideId)) {
      return res.status(400).json({ message: 'Invalid ride ID' });
    }

    // Fetch ride with populated user (owner) and car details
    const ride = await bookingModal.findById(rideId)
      .populate('user', 'name email')
      .populate('car', 'name model');

    if (!ride) {
      return res.status(404).json({ message: 'Ride not found' });
    }

    // Initialize passengers array if not present
    if (!ride.passengers) {
      ride.passengers = [];
    }

    // Check if user already joined
    if (ride.passengers.includes(userId)) {
      return res.status(400).json({ message: 'You have already joined this ride' });
    }

    // Check seat availability
    if (ride.seatsAvailable <= 0) {
      return res.status(400).json({ message: 'No available seats on this ride' });
    }

    // Update ride data
    ride.passengers.push(userId);
    ride.seatsAvailable -= 1;
    await ride.save();

    // ✅ Email to ride owner
    const mailOptions = {
      from: 'puripratham11@gmail.com', // your verified sender email
      to: ride.user.email,             // ✅ ride owner's email
      subject: 'Someone joined your carpool ride',
      text: `Hi ${ride.user.name},

A user (${userEmail}) has joined your carpool ride from ${ride.startLocation} to ${ride.endLocation}.

📅 Ride Date & Time: ${new Date(ride.bookedTimeSlot.startDate).toLocaleString()}
🚗 Car: ${ride.car.name} (${ride.car.model})

Thanks for using our Car Pooling System!

- Team CarPool`,
    };

    // ✅ Send the email
    try {
      await transporter.sendMail(mailOptions);
      console.log(`✅ Email sent to ${ride.user.email}`);
    } catch (emailErr) {
      console.error(`❌ Failed to send email to ${ride.user.email}:`, emailErr);
    }

    res.status(200).json({ message: 'Joined the ride successfully', ride });

  } catch (error) {
    console.error('❌ Error joining ride:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
