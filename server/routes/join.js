const express = require('express');
const bookingModal = require('../modals/carBooking'); // Your booking model
const router = express.Router();
const mongoose = require('mongoose');

// POST: Join a ride by ride ID
router.post('/join/:id', async (req, res) => {
  try {
    const rideId = req.params.id;
    const userId = req.body.userId;  // User ID from the frontend (logged-in user)

    // Validate rideId to ensure it's a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(rideId)) {
      return res.status(400).json({ message: 'Invalid ride ID' });
    }

    // Find the ride by rideId
    const ride = await bookingModal.findById(rideId);
    if (!ride) {
      return res.status(404).json({ message: 'Ride not found' });
    }

    // Check if passengers array exists, if not, initialize it
    if (!ride.passengers) {
      ride.passengers = []; // Initialize passengers array if it doesn't exist
    }

    // Check if the user has already joined the ride
    if (ride.passengers.includes(userId)) {
      return res.status(400).json({ message: 'You have already joined this ride' });
    }

    // Add the user to the passengers array
    ride.passengers.push(userId);

    // Optionally, decrease the seats available
    if (ride.seatsAvailable > 0) {
      ride.seatsAvailable -= 1;
    } else {
      return res.status(400).json({ message: 'No available seats on this ride' });
    }

    // Save the updated ride information
    await ride.save();

    // Respond with a success message
    res.status(200).json({ message: 'Joined the ride successfully', ride });

  } catch (error) {
    console.error('Error joining ride:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
