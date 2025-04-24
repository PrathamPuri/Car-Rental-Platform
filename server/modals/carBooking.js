const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  car: { type: mongoose.Schema.Types.ObjectId, ref: "cars" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  passengers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Array of users who join the ride
  bookedTimeSlot: {
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },
  totalAmount: { type: Number },
  hours: { type: Number },
  driverRequired: { type: String },
  startLocation: { type: String },
  endLocation: { type: String },
  pooling: { type: Boolean, default: false },
  seatsAvailable:{type:Number}
   
});

const bookingModal = mongoose.model("bookingModal", bookingSchema);

module.exports = bookingModal;
