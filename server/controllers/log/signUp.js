import Users from "../../models/user.js";
import Token from "../../models/token.js";
import crypto from "crypto";
import { sendEmail } from "../../utils/sendEmail.js";

export const signUp = async (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body;
  const data = new Users({
    firstName: firstName,
    lastName: lastName,
    email: email,
    phone: phone,
    password: password,
  });

  try {
    const user = await Users.findOne({ email: email });

    if (user) {
      // Check if the account is verified
      if (user.verified) {
        res.json("verified"); // User should log in directly
      } else {
        // Check if a verification token exists and is not expired
        const token = await Token.findOne({
          userId: user._id,
          expiresAt: { $gt: Date.now() }, // Check if token hasn't expired
        });

        if (token) {
          res.json("checkEmail"); // User should check their email for verification
        } else {
          // Create a new verification token
          const newToken = await new Token({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex"),
          }).save();

          // Send a verification email with the new token
          const url = `${process.env.FRONT_END_URL}/verify/${user._id}/${newToken.token}`;
          const emailSent = await sendEmail(
            user.email,
            "Verify your email",
            "verificationEmail.ejs",
            { firstName: user.firstName, verificationLink: url }
          );

          if (emailSent === "sendEmailError") {
            res.json("emailNotSent");
          } else {
            res.json("checkEmail"); // Inform the user to check their email for verification
          }
        }
      }
    } else {
      // User does not exist, proceed with registration

      try {
        // ... Your existing code for registration ...

        // Continue with saving the user's data
        await data.save();

        // Create a new verification token
        const newToken = await new Token({
          userId: data._id,
          token: crypto.randomBytes(32).toString("hex"),
        }).save();

        // Send a verification email with the new token
        const url = `${process.env.FRONT_END_URL}/verify/${data._id}/${newToken.token}`;
        const emailSent = await sendEmail(
          data.email,
          "Verify your email",
          "verificationEmail.ejs",
          { firstName: data.firstName, verificationLink: url }
        );

        if (emailSent === "sendEmailError") {
          res.json("emailNotSent");
        } else {
          res.json("checkEmail"); // Inform the user to check their email for verification
        }
      } catch (e) {
        console.log(e);
        res.status(500).json("Error occurred during registration");
      }
    }
  } catch (e) {
    console.log(e);
    res.status(500).json("Error occurred");
  }
};
