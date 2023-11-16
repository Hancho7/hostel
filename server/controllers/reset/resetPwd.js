import Users from "../../models/user.js";
import Token from "../../models/token.js";
import crypto from "crypto";
import { sendEmail } from "../../utils/sendEmail.js";

export const reset = async (req, res) => {
  console.log('request body',req.body)
  const { email } = req.body;

  console.log(email)
  try {
    const user = await Users.findOne({ email: email });
    if (!user) {
      return res.json("User not found");
    }

    console.log(user)
    // CREATING THE TOKEN USING CRYPTO USING USER-ID AS TOKEN-ID
    const token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();

    // CREATING THE URL LINK FOR USER TO VERIFY E-MAIL
    const url = `${process.env.FRONT_END_URL}/forgotten-password/${user._id}/verify/${token.token}`;
    const emailSent = await sendEmail(
      user.email,
      "reset password",
      "verificationEmail.ejs",
      { firstName: user.firstName, verificationLink: url }
    );
    if (emailSent === "sendEmailError") {
      return res.json("emailNotSent");
    } else {
      return res.json("checkEmail"); // Inform the user to check their email for verification
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json("error occurred");
  }
};
