import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  updateCategory,
} from "../controllers/productCategory.js";
import { verifyToken, isAdmin } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/", getAllCategory);
router.post("/", [verifyToken, isAdmin], createCategory);
router.put("/:id", [verifyToken, isAdmin], updateCategory);
router.delete("/:id", [verifyToken, isAdmin], deleteCategory);

export default router;
