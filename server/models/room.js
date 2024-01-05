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
  description: {
    type: String,
  },
  hostel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hostel'
  },
});

const Room = mongoose.model("Room", RoomSchema);
export default Room;
