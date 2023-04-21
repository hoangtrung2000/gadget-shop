import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/product.js";
import { isAdmin, verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/", [verifyToken, isAdmin], createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.put("/:id", [verifyToken, isAdmin], updateProduct);
router.delete("/:id", [verifyToken, isAdmin], deleteProduct);

export default router;
