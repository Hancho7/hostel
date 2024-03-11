const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var staffSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  hostel: {
    type: Schema.Types.ObjectId,
    ref: "Hostel",
    required: true,
  },
  profilePicture: [
    {
      type: String,
      unique: true,
    },
  ],
  admin: {
    type: Schema.Types.ObjectId,
    ref: "AdminUsers",
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },

  password: { type: String, required: true },
});

const Staff = mongoose.model("Staff", staffSchema);
module.exports = Staff;
