import express from "express";
import { getCurrent, login, register } from "../controllers/user.js";
import { verifyToken } from "../middlewares/verifyToken.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/current", verifyToken, getCurrent);

export default router;
