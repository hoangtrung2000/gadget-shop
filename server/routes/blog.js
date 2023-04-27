import express from "express";
import { isAdmin, verifyToken } from "../middlewares/verifyToken.js";
import {
  createBlog,
  deleteBlog,
  dislikeBlog,
  getAllBlog,
  getBlogById,
  likeBlog,
  updateBlog,
} from "../controllers/blog.js";

const router = express.Router();

router.get("/", getAllBlog);
router.get("/:id", getBlogById);
router.post("/", [verifyToken, isAdmin], createBlog);
router.put("/like/:id", verifyToken, likeBlog);
router.put("/dislike/:id", verifyToken, dislikeBlog);
router.put("/:id", [verifyToken, isAdmin], updateBlog);
router.delete("/:id", [verifyToken, isAdmin], deleteBlog);

export default router;
