import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  ratingProduct,
  updateProduct,
} from "../controllers/product.js";
import { isAdmin, verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/", [verifyToken, isAdmin], createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.put("/rating", verifyToken, ratingProduct);
router.put("/:id", [verifyToken, isAdmin], updateProduct);
router.delete("/:id", [verifyToken, isAdmin], deleteProduct);

export default router;
