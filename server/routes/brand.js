import express from "express";

import {
  createBrand,
  deleteBrand,
  getAllBrand,
  updateBrand,
} from "../controllers/brand.js";
import { isAdmin, verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/", getAllBrand);
router.post("/", [verifyToken, isAdmin], createBrand);
router.put("/:id", [verifyToken, isAdmin], updateBrand);
router.delete("/:id", [verifyToken, isAdmin], deleteBrand);

export default router;
