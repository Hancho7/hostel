const mongoose = require("mongoose");
// import Users from "./user.js";

const HostelSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 2,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  images: [
    {
      type: String,
      unique: true,
    },
  ],
  description: [
    {
      type: String,
      required: true,
      min: 1,
      max: 100,
    },
  ],
  address: {
    latitude: {
      type: String,
    },
    longitude: {
      type: String,
    },
    formattedAddress: {
      type: String,
    },
  },

  adminID: {
    type: String,
  },
});

// // Define a virtual field for 'fullRooms' to populate rooms
// HostelSchema.virtual("fullRooms", {
//   ref: "Room",
//   localField: "_id",
//   foreignField: "hostel",
// });

// // Optionally, ensure virtuals are included when converting the document to an object
// HostelSchema.set("toObject", { virtuals: true });
// HostelSchema.set("toJSON", { virtuals: true });

const Hostel = mongoose.model("Hostel", HostelSchema);
module.exports= Hostel;
