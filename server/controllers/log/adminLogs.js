const { AdminUsers } = require("../../models/adminUser.js");
const { AdminToken } = require("../../models/token.js");
const { sendEmail } = require("../../utils/sendEmail.js");
const crypto = require("crypto");
const verifyEmail = require("../../utils/emailVerification.js");
const { generateRandomId } = require("../../utils/generatorID");
const {
  saveToBucket,
  deleteFromBucket,
  getFromBucket,
} = require("../../utils/AWSbucket.js");

// Validation module
const validateRequest = (req) => {
  const { name, email, contact, password } = req.body;
  const { profilePicture, hostelLogo } = req.files;

  console.log("request body", req.body);
  console.log("request files", req.files);

  if (
    !name ||
    !email ||
    !contact ||
    !password ||
    !profilePicture ||
    !hostelLogo
  ) {
    throw new Error("Missing required fields");
  }
};

const checkUserExists = async (email) => {
  return await AdminUsers.findOne({ email: email });
};

const checkAccountVerified = (user) => {
  if (user && user.verified) {
    throw new Error("This email has already been verified");
  }
};

const checkVerificationToken = async (user) => {
  if (user && !user.verified) {
    const token = await AdminToken.findOne({
      userId: user._id,
      expiresAt: { $gt: Date.now() },
    });

    if (token) {
      throw new Error("Verify your email, a token has been sent");
    } else {
      await AdminToken.deleteOne({ userId: user._id });

      // Create a new verification token
      const newToken = await new AdminToken({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();

      // Send a verification email with the new token

      const url = `${process.env.FRONT_END_URL}/admin/verifying-your-email/${user._id}/hostel-search-admin/${newToken.token}`;
      await sendEmail(
        user.email,
        "Verify your email",
        "verificationEmail.ejs",
        { firstName: user.name, verificationLink: url }
      );

      throw new Error("Check your email for verification");
    }
  }
};

// User Creation module
const createUser = (randomID, name, email, contact, password) => {
  return new AdminUsers({
    name: name,
    email: email,
    secondID: randomID,
    contact: contact,
    password: password,
  });
};

// Image Handling module
const handleImages = async (profilePicture, hostelLogo) => {
  const profilePictureKeys = await saveToBucket(profilePicture);
  const hostelLogoKeys = await saveToBucket(hostelLogo);

  if (profilePictureKeys.length === 0 || hostelLogoKeys.length === 0) {
    const keysToDelete = [profilePictureKeys, hostelLogoKeys]
      .flat()
      .map((file) => file.key);

    if (keysToDelete.length > 0) {
      await deleteFromBucket(res, keysToDelete);
    }

    throw new Error("Error uploading the images");
  }

  return { profilePictureKeys, hostelLogoKeys };
};

// Verification Token Creation module
const createVerificationToken = async (userId, user) => {
  const newToken = await new AdminToken({
    userId: userId,
    token: crypto.randomBytes(32).toString("hex"),
  }).save();

  // Send a verification email with the new token
  const url = `${process.env.FRONT_END_URL}/admin/verifying-your-email/${userId}/hostel-search-admin/${newToken.token}`;
  await sendEmail(user.email, "Verify your email", "verificationEmail.ejs", {
    name: user.name,
    verificationLink: url,
  });
};

// Error Handling module
const handleErrors = (res, e) => {
  if (e instanceof Error) {
    return res.status(500).json({
      status: "error",
      message: e.message,
      code: 500,
    });
  } else {
    return res.status(500).json({
      status: "error",
      message: e.message,
      code: 500,
    });
  }
};

module.exports = {
  adminSignUp: async (req, res) => {
    console.log("req.body", req.body);
    console.log("req.files", req.files);
    try {
      validateRequest(req);

      const { name, email, contact, password } = req.body;
      const { profilePicture, hostelLogo } = req.files;

      const randomID = generateRandomId();
      let user = await checkUserExists(email);

      checkAccountVerified(user);
      await checkVerificationToken(user);

      user = createUser(randomID, name, email, contact, password);
      const { profilePictureKeys, hostelLogoKeys } = await handleImages(
        profilePicture,
        hostelLogo
      );

      user.profilePicture = profilePictureKeys[0].key;
      user.hostelLogo = hostelLogoKeys[0].key;

      await user.save();
      await createVerificationToken(user._id, user);

      res.status(200).json({
        status: "success",
        message: "Check your email for verification",
        code: 200,
      });
    } catch (e) {
      handleErrors(res, e);
    }
  },

  // MANAGING THE USER LOGGINS
  adminSignIn: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await AdminUsers.findOne({ email: email });

      if (user) {
        const isMatch = await user.comparePassword(password);

        if (isMatch) {
          // Login successful
          const { name, profilePicture, hostelLogo } = user;
          const [newProfilePicture, newHostelLogo] = await Promise.all([
            getFromBucket(profilePicture),
            getFromBucket(hostelLogo),
          ]);
          const response = {
            name,
            newProfilePicture,
            newHostelLogo,
          };
          return res.status(200).json({
            status: "success",
            message: "You have been successfully logged in!",
            code: 200,
            data: response,
          });
        } else {
          // Incorrect password
          return res.status(401).json({
            status: "error",
            message: "Incorrect Password!",
            code: 401,
          });
        }
      } else {
        // User not found
        return res.status(404).json({
          status: "error",
          message: "This user does not exist!",
          code: 404,
        });
      }
    } catch (e) {
      console.log(e);

      // Handle errors
      if (e instanceof Error) {
        return res.status(500).json({
          status: "error",
          message: e.message,
          code: 500,
        });
      } else {
        return res.status(500).json({
          status: "error",
          message: e.message,
          code: 500,
        });
      }
    }
  },

  // ADMIN VERIFYING THEIR EMAILS
  adminEmailVerification: async (req, res) => {
    console.log(req.params);
    console.log(req.body);
    const { id, token } = req.params;

    try {
      if (!id || !token) {
        return res.status(422).json({
          status: "unprocessable entity",
          message: "Empty id and token",
          code: 422,
        });
      }

      // Pass res as a parameter to the verifyEmail function
      const response = await verifyEmail(id, token, AdminUsers, AdminToken);

      console.log("response", response);
      return res.status(response.code).json({
        ...response,
      });
    } catch (error) {
      console.log(error);

      // Handle errors
      return res.status(500).json({
        status: "error",
        message: error.message,
        code: 500,
      });
    }
  },
};
