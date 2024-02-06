const express = require("express");
const upload = require("../utils/multer");
const { signUp, signIn, emailVerification } = require("../controllers/log/userLogs.js");

const router = express.Router();

router.post("/sign-up",upload.single("profilePicture"), signUp);
router.post("/sign-in", signIn);
router.post("/verify-your-email/:id/:token", emailVerification);
module.exports = router;
