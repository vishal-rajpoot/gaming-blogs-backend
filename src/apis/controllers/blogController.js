import { NotFoundError } from "../../utils/appErrors.js";
import { sendError, sendSuccess } from "../../utils/responseHandler.js";
import Blog from "../../models/blogs.js";

export const createBlog = async (req, res) => {
  try {
    const { title, content, imageUrl } = req.body;
    const data = await Blog.create({ title, content, imageUrl });
    return sendSuccess(res, data, "blog added successfully");
  } catch (error) {
    logger.error("error while adding blog");
    return sendError(res, error, "Failed to create blog");
  }
};

export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findAll();
    return sendSuccess(res, { blogs }, "getting blogs successfully");
  } catch (error) {
    logger.error("error while fetching blogs");
    return sendError(res, error, "Failed to fetch blogs");
  }
};

export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) {
      return new NotFoundError("Blog not found");
    }
    return sendSuccess(res, { blogs: blog }, "getting blog by id successfully");
  } catch (error) {
    logger.error("error while fetching blog");
    return sendError(res, error, "Failed to fetch blog");
  }
};
