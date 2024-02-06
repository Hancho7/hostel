const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const userTokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
    unique: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600,
  },
});

const adminTokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "AdminUsers",
    unique: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600,
  },
});
const UserToken = mongoose.model("Token", userTokenSchema);
const AdminToken = mongoose.model("AdminToken", adminTokenSchema);
module.exports = {UserToken, AdminToken};
