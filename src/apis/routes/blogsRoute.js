import express from "express";
import tryCatchHandler from "../../utils/tryCatchHandler.js";
import {
  createBlog,
  getBlogById,
  getBlogs,
} from "../controllers/blogController.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", tryCatchHandler(getBlogs));
router.get("/:id", tryCatchHandler(getBlogById));
router.post("/blogs", authMiddleware, tryCatchHandler(createBlog)); // Only admin can post

export default router;
