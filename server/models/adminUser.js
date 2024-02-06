const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminUserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 2,
  },
  email: {
    type: String,
    required: true,
    min: 2,
  },
  secondID: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
    min: 10,
    max: 10,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  profilePicture: [
    {
      type: String,
      unique: true,
    },
  ],
  hostelLogo: [
    {
      type: String,
      unique: true,
    },
  ],
  verified: {
    type: Boolean,
    required: true,
    default: false,
  },
});

adminUserSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    bcrypt.hash(this.password, 10, (err, result) => {
      if (err) return next(err);
      this.password = result;
      next();
    });
  } else {
    next(); // Call next() here to ensure the middleware continues
  }
});

adminUserSchema.methods.comparePassword = async function (password) {
  if (!password) return "there is no password";
  try {
    const result = await bcrypt.compare(password, this.password);
    return result;
  } catch (err) {
    console.error("Compare Password Error:", err);
    return false;
  }
};

const AdminUsers = mongoose.model("AdminUsers", adminUserSchema);

module.exports = { adminUserSchema, AdminUsers };
