import Like from "../models/like.js";
import Comment from "../models/comment.js";

export const likeComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const userId = req.user.id; // Assuming you have authentication middleware

    // Check if comment exists
    const comment = await Comment.findByPk(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Check if user already liked the comment
    const existingLike = await Like.findOne({
      where: { commentId, userId },
    });

    if (existingLike) {
      return res
        .status(400)
        .json({ message: "You already liked this comment" });
    }

    // Create new like
    const newLike = await Like.create({ commentId, userId });
    return res.status(201).json({ message: "Comment liked", like: newLike });
  } catch (error) {
    next(error);
  }
};

export const unlikeComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const userId = req.user.id; // Assuming you have authentication middleware

    // Check if the like exists
    const existingLike = await Like.findOne({
      where: { commentId, userId },
    });

    if (!existingLike) {
      return res.status(404).json({ message: "Like not found" });
    }

    // Delete the like
    await existingLike.destroy();
    return res.status(200).json({ message: "Like removed" });
  } catch (error) {
    next(error);
  }
};

export const getLikesForComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;

    // Find likes for the given comment
    const likes = await Like.findAll({
      where: { commentId },
      include: [{ model: User, attributes: ["id", "username"] }], // Optional: include user details
    });

    return res.status(200).json(likes);
  } catch (error) {
    next(error);
  }
};
