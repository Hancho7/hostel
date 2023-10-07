import Comment from "../../models/comments.js";


export const getComments= async (req, res) => {
    const page = parseInt(req.query.page) || 1; 
    const perPage = 5; 

    try {
      const comments = await Comment.find()
        .populate("user", "firstName lastName")
        .sort({ createdAt: -1 }) 
        .skip((page - 1) * perPage) 
        .limit(perPage); 
  
      res.json(comments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred while fetching comments." });
    }
  };
  