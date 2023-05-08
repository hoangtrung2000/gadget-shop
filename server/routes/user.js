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
  updateAddressUser,
  updateCart,
  updateUser,
  updateUserByAdmin,
} from "../controllers/user.js";
import { isAdmin, verifyToken } from "../middlewares/verifyToken.js";
const router = express.Router();

// POST METHOD
router.post("/login", login);
router.post("/register", register);
router.post("/refreshtoken", refreshToken);
router.post("/resetpassword", resetPassword);

// GET METHOD
router.get("/", [verifyToken, isAdmin], getUsers);
router.get("/current", verifyToken, getCurrent);
router.get("/forgotpassword", forgotPassword);
router.get("/logout", logOut);

// PUT METHOD
router.put("/address", verifyToken, updateAddressUser);
router.put("/cart", verifyToken, updateCart);
router.put("/current", verifyToken, updateUser);
router.put("/:uid", [verifyToken, isAdmin], updateUserByAdmin);

// DELETE METHOD
router.delete("/", [verifyToken, isAdmin], deleteUser);

export default router;
