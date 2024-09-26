import express from "express";
import tryCatchHandler from "../../utils/tryCatchHandler.js";
import {
  createComment,
  getCommentReplies,
  getCommentsByBlogId,
  likeComment,
} from "../controllers/commentController.js";

const router = express.Router();

router.post("/comments/:blogId", tryCatchHandler(createComment)); // Post a comment on a blog
router.get("/comments/:blogId", tryCatchHandler(getCommentsByBlogId)); // Get comments for a blog
router.post("/comments/like/:commentId", tryCatchHandler(likeComment)); // Like a comment
router.get("/comments/replies/:commentId", tryCatchHandler(getCommentReplies));

export default router;
