const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  roomID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true,
  },
  hostelID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hostel',
    required: true,
  },
  checkInDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  duration: {
    type: Number, // Duration in seconds
    required: true,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  paid: {
    type: Boolean,
    default: false,
  },
});

// Calculate the expiry date based on the check-in date and duration
BookingSchema.pre('save', function(next) {
  const expiryDate = new Date(this.checkInDate);
  expiryDate.setSeconds(expiryDate.getSeconds() + this.duration); // Add duration in seconds
  this.expiryDate = expiryDate;
  next();
});

const Booking = mongoose.model('Booking', BookingSchema);

module.exports = Booking;
