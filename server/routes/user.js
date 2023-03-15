import express from "express";
import {
  getCurrent,
  login,
  logOut,
  refreshToken,
  register,
} from "../controllers/user.js";
import { verifyToken } from "../middlewares/verifyToken.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/current", verifyToken, getCurrent);
router.post("/refreshtoken", refreshToken);
router.get("/logout", logOut);

export default router;
