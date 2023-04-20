import express from "express";
import {
  deleteUser,
  forgotPassword,
  getCurrent,
  getUsers,
  login,
  logOut,
  refreshToken,
  register,
  resetPassword,
  updateUser,
  updateUserByAdmin,
} from "../controllers/user.js";
import { verifyToken, isAdmin } from "../middlewares/verifyToken.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refreshtoken", refreshToken);
router.post("/refreshtoken", refreshToken);
router.post("/resetpassword", resetPassword);
router.get("/current", verifyToken, getCurrent);
router.get("/logout", logOut);
router.get("/forgotpassword", forgotPassword);
router.get("/", [verifyToken, isAdmin], getUsers);
router.delete("/", [verifyToken, isAdmin], deleteUser);
router.put("/current", verifyToken, updateUser);
router.put("/:uid", [verifyToken, isAdmin], updateUserByAdmin);

export default router;
