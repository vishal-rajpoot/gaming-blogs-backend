import express from "express";
import ping from "./routes/pingRoute.js";
// import chats from "./routes/chatRoute.js";
import blogs from "./routes/blogsRoute.js";
import auth from "./routes/authRoute.js";
import Comment from "./routes/commentsRoute.js";

// Add your newly create component routes here with route prefix.
const router = express.Router();

router.use("/ping", ping);
router.use("/auth", auth);
router.use("/blogs", blogs);
router.use("/comments", Comment);

/* Make sure while changing below parentrouter.
This is top level router created to enhance in future like versioning, route prefix etc. */
const parentRouter = express.Router();
parentRouter.use("/api", router);

export default parentRouter;
