const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
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
  expiryDate: {
    type: Date,
    required: true,
    default: () => {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + 2);
      return currentDate;
    },
  },
  paid: {
    type: Boolean,
    default: false,
  },
});

const Booking = mongoose.model("Booking", BookingSchema);

module.exports = Booking;
