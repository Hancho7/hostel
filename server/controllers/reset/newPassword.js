import Token from "../../models/token.js";
import Users from "../../models/user.js";

export const newPassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({ email:email });
    if (!user) {
      res.json("invalid link");
    }

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });

    if (!token) {
      res.json("invalid link");
    }
    await Users.updateOne({ _id: user._id }, { password: password });
    await Token.deleteOne({ _id: token._id });

    res.json("password updated");
  } catch (error) {
    console.log(error);
  }
};
