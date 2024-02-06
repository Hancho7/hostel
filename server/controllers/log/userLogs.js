const { Users } = require("../../models/user.js");
const { UserToken } = require("../../models/token.js");
const crypto = require("crypto");
const { sendEmail } = require("../../utils/sendEmail.js");
const { saveToBucket, getFromBucket } = require("../../utils/AWSbucket.js");
const { error } = require("console");

module.exports = {
  signUp: async (req, res) => {
    console.log("request body", req.body);
    console.log("request file", req.file);
    const { name, email, password } = req.body;
    const profilePicture = [req.file];
    console.log("profilePicture", profilePicture);

    if (!name || !email || !password || !profilePicture) {
      res.status(400).json({
        status: "error",
        message: "Missing required fields",
        code: 400,
      });
    }

    try {
      const user = await Users.findOne({ email: email });

      if (user) {
        // Check if the account is verified
        if (user.verified) {
          res.status(409).json({
            status: "success",
            message: "This email has already been verified",
            code: 409,
          });
        } else {
          // Check if a verification token exists and is not expired
          const token = await UserToken.findOne({
            userId: user._id,
            expiresAt: { $gt: Date.now() }, // Check if token hasn't expired
          });

          if (token) {
            res.status(200).json({
              status: "success",
              message: "Verify your email, a token has been sent",
              code: 200,
            });
          } else {
            await UserToken.deleteOne({ userId: user._id });
            // Create a new verification token
            const newToken = await new UserToken({
              userId: user._id,
              token: crypto.randomBytes(32).toString("hex"),
            }).save();

            // Send a verification email with the new token
            const url = `${process.env.FRONT_END_URL}/verify/${user._id}/${newToken.token}`;
            const emailSent = await sendEmail(
              user.email,
              "Verify your email",
              "verificationEmail.ejs",
              { name: user.name, verificationLink: url }
            );

            if (emailSent === "sendEmailError") {
              res.status(500).json({
                status: "error",
                message: "Error occurred during email sending",
                code: 500,
              });
            } else {
              res.status(200).json({
                status: "success",
                message: "Check your email for verification",
              });
            }
          }
        }
      } else {
        // User does not exist, proceed with registration

        try {
          const profilePictureKey = await saveToBucket(profilePicture);
          if (!profilePictureKey) {
            throw new error("Unable to save user profile");
          }
          console.log("profilePictureKey", profilePictureKey);
          const profilePictureKeys = profilePictureKey.map((file) => file.key);

          const data = await new Users({
            name: name,
            email: email,
            password: password,
            profilePicture: profilePictureKeys,
          }).save();
          // Create a new verification token
          const newToken = await new UserToken({
            userId: data._id,
            token: crypto.randomBytes(32).toString("hex"),
          }).save();

          // Send a verification email with the new token
          const url = `${process.env.FRONT_END_URL}/verify/${data._id}/${newToken.token}`;
          const emailSent = await sendEmail(
            data.email,
            "Verify your email",
            "verificationEmail.ejs",
            { name: data.name, verificationLink: url }
          );

          if (emailSent === "sendEmailError") {
            res.status(500).json({
              status: "error",
              message: "Error occurred during sending of email",
              code: 500,
            });
          } else {
            res.status(200).json({
              status: "success",
              message: "Check your email for verification",
              code: 200,
            });
          }
          // ...
        } catch (e) {
          console.log(e);

          if (e instanceof Error) {
            res.status(500).json({
              status: "error",
              message: e.message,
              code: 500,
            });
          } else {
            res.status(500).json({
              status: "error",
              message: "An error occured during registration",
              code: 500,
            });
          }
        }
      }
    } catch (e) {
      console.log(e);

      if (e instanceof Error) {
        res.status(500).json({
          status: "error",
          message: e.message,
          code: 500,
        });
      } else {
        res.status(500).json({
          status: "error",
          message: "An unexpected error occurred",
          code: 500,
        });
      }
    }
  },

  // USER SIGNING IN
  signIn: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await Users.findOne({ email: email });

      if (user) {
        const isMatch = await user.comparePassword(password);

        if (isMatch) {
          // Login successful
          const { name, profilePicture } = user;
          const newProfilePicture = await getFromBucket(profilePicture);
          const response = {
            name,
            newProfilePicture,
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

  emailVerification: async (req, res) => {
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
      const response = await verifyEmail(id, token, Users, UserToken);

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
