import express from "express";
import uploader from "../config/cloudinary.config.js";
import {
  createBlog,
  deleteBlog,
  dislikeBlog,
  getAllBlog,
  getBlogById,
  likeBlog,
  updateBlog,
  updateImageBlog,
} from "../controllers/blog.js";
import { isAdmin, verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/", getAllBlog);
router.get("/:id", getBlogById);
router.post("/", [verifyToken, isAdmin], createBlog);
router.put("/like/:id", verifyToken, uploader.single("image"), likeBlog);
router.put("/uploadimage/:id", verifyToken, updateImageBlog);
router.put("/dislike/:id", verifyToken, dislikeBlog);
router.put("/:id", [verifyToken, isAdmin], updateBlog);
router.delete("/:id", [verifyToken, isAdmin], deleteBlog);

export default router;
