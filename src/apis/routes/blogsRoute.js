import express from "express";
import tryCatchHandler from "../../utils/tryCatchHandler.js";

const router = express.Router();

router.get("/", tryCatchHandler());
router.get("/:id", tryCatchHandler());

export default router;
