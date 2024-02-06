const express = require("express");
const {
  adminSignUp,
  adminSignIn,
  adminEmailVerification,
} = require("../controllers/log/adminLogs");
const upload = require("../utils/multer"); // Import the Multer middleware

const router = express.Router();

// Use the 'upload' middleware to handle file uploads
router.post(
  "/sign-up",
  upload.fields([
    { name: "hostelLogo", maxCount: 1 },
    { name: "profilePicture", maxCount: 1 },
  ]),
  adminSignUp
);

router.post("/sign-in", adminSignIn);

router.post(
  "/verifying-your-email/:id/hostel-search-admin/:token",
  adminEmailVerification
);

module.exports = router;
