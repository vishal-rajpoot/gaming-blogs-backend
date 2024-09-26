import Comment from "../../models/comments.js";
import Like from "../../models/likes.js";
import { DuplicateDataError, NotFoundError } from "../../utils/appErrors.js";

export const createComment = async (req, res) => {
  try {
    const { username, content, parentCommentId } = req.body;
    const comment = await Comment.create({
      username,
      content,
      blogId: req.params.blogId,
      parentCommentId,
    });
    return sendSuccess(res, comment, "comment added successfully");
  } catch (error) {
    logger.error("error while adding comment");
    return sendError(res, error, "Failed to add comment");
  }
};

export const getCommentsByBlogId = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: { blogId: req.params.blogId, parentCommentId: null },
      include: { model: Comment, as: "replies" },
    });
    return sendSuccess(res, comments, "getting comments successfully");
  } catch (error) {
    logger.error("error while getting comment");
    return sendError(res, error, "Failed to fetch comments");
  }
};

export const likeComment = async (req, res) => {
  try {
    const { likedBy } = req.body;
    const { commentId } = req.params;
    const userId = req.user.id;

    // Check if comment exists
    const comment = await Comment.findByPk(commentId);
    if (!comment) {
      return new NotFoundError("Comment not found");
    }

    const like = await Like.create({
      commentId: req.params.commentId,
      likedBy,
    });

    const existingLike = await Like.findOne({
      where: { commentId, userId },
    });

    if (existingLike) {
      return new DuplicateDataError("You already liked this comment");
    }
    return sendSuccess(res, like, "like added successfully");
  } catch (error) {
    logger.error("error while like the comment");
    return sendError(res, error, "Failed to like the comment");
  }
};

export const getCommentReplies = async (req, res) => {
  try {
    const replies = await Comment.findAll({
      where: { parentCommentId: req.params.commentId },
    });
    return sendSuccess(res, replies, "getting replies successfully");
  } catch (error) {
    logger.error("error while fetch replies");
    return sendError(res, error, "Failed to fetch replies");
  }
};
