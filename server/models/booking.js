const mongoose = require("mongoose");
const { Users } = require("./user.js");
const Hostel = require("./hostel.js");

const BookingSchema = mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  roomID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    required: true,
  },
  hostelID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hostel",
    required: true,
  },
  checkInDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  paid: {
    type: Boolean,
    default: false,
  },
});

// Create a TTL index for the checkInDate field
BookingSchema.index({ checkInDate: 1 }, { expireAfterSeconds: 3600 });

const Booking = mongoose.model("Booking", BookingSchema);

module.exports = Booking;