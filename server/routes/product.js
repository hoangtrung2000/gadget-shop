import express from "express";
import uploader from "../config/cloudinary.config.js";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  ratingProduct,
  updateProduct,
  uploadImages,
} from "../controllers/product.js";
import { isAdmin, verifyToken } from "../middlewares/verifyToken.js";
const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", [verifyToken, isAdmin], createProduct);
router.put(
  "/uploadimage/:id",
  [verifyToken, isAdmin],
  uploader.array("images", 10),
  uploadImages
);
router.put("/rating", verifyToken, ratingProduct);
router.put("/:id", [verifyToken, isAdmin], updateProduct);
router.delete("/:id", [verifyToken, isAdmin], deleteProduct);

export default router;
