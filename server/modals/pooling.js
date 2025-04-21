const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  driver: { type: String, required: true },
  car: { type: String, required: true },
  seatsAvailable: { type: Number, required: true },
  cost: { type: Number, required: true },
  startLocation: { type: String, required: true },
  endLocation: { type: String, required: true },
  date: { type: Date, required: true }
});

const Ride = mongoose.model('Ride', rideSchema);

module.exports = Ride;
