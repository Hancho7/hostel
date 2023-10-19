import mongoose from "mongoose";

const RoomSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  remainingCapacity: {
    type: Number,
    required: true,
  },
  bookings: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // You'll need to create a User model for storing user information.
      },
      checkInDate: {
        type: Date,
        required: true,
      },
      checkOutDate: {
        type: Date,
        required: true,
      },
    },
  ],
});

const Room = mongoose.model("Room", RoomSchema);
