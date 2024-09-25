import express from "express";
// import { loginUser, registerUser } from "../Controllers/authController.js";
import tryCatchHandler from "../../utils/tryCatchHandler.js";

const router = express.Router();

router.post("/registeration", tryCatchHandler());
router.post("/login", tryCatchHandler());

export default router;
