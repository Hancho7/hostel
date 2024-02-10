const mongoose = require("mongoose");

const RoomSchema = mongoose.Schema({
  nameOfHostel: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  numberInRoom: {
    type: Number,
    required: true,
  },
  available: {
    type: Number,
    required: true,
  },
  remainingCapacity: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  hostel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hostel",
  },
});

const Room = mongoose.model("Room", RoomSchema);
module.exports = Room;
