import Comment from "../../models/comments.js";

// Create an endpoint for posting comments
export const createComments= async (req, res) => {
  const { text, userId } = req.body; // Assuming you send the user's ID from the frontend

  try {
    // Create a new comment and associate it with the user's ID
    const newComment = new Comment({
      user: userId, // The user's ID from the frontend
      text,
    });

    const savedComment = await newComment.save();

    res.json(savedComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while saving the comment." });
  }
}
