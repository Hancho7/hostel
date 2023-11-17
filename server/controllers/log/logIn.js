import Users from "../../models/user.js"

export const logIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Users.findOne({ email: email });

        if (user) {
            const isMatch = await user.comparePassword(password);

            if (isMatch) {
                // Login successful
                res.json(user);
            } else {
                // Incorrect password
                res.status(401).json({ error: "IncorrectPassword" });
            }
        } else {
            // User not found
            res.status(404).json({ error: "UserNotFound" });
        }
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ error: "ServerError" });
    }
};
