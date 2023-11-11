import mongoose from "mongoose";

const HostelSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 2,
  },
  location: {
    type: String,
    required: true,
    min: 10,
    max: 50,
  },
  hostelDescription: [
    {
      type: String,
      required: true,
      min: 1,
      max: 100,
    },
  ],
  prices: [
    {
      numberInRoom: { type: String },
      price: { type: Number },
    },
  ],
  imageUrl: [
    {
      type: String,
      unique: true,
    },
  ],
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
});


// Define a virtual field for 'fullRooms' to populate rooms
HostelSchema.virtual("fullRooms", {
  ref: "Room",
  localField: "_id",
  foreignField: "hostel",
});

// Optionally, ensure virtuals are included when converting the document to an object
HostelSchema.set("toObject", { virtuals: true });
HostelSchema.set("toJSON", { virtuals: true });


const Hostel = mongoose.model("Hostel", HostelSchema);
export default Hostel;
