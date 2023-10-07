import Users from '../../models/user.js';
import Token from '../../models/token.js';
import crypto from 'crypto'
import { sendEmail } from '../../utils/sendEmail.js';

export const reset = async (req, res) => {
  
  const { email } = req.body;
  
  try {
    const user = await Users.findOne({ email: email });
    if (!user) {
      res.json("User not found");
    }
    

    // CREATING THE TOKEN USING CRYPTO USING USER-ID AS TOKEN-ID
    const token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();

    // CREATING THE URL LINK FOR USER TO VERIFY E-MAIL
    const url = `${process.env.SERVER_URL}/resetPassword/${user._id}/verify/${token.token}`;
    await sendEmail(user.email, "Verify your email", url);
    res.json("Email_Sent");

  } catch (error) {
    console.log(error)
  }
};
