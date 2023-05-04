import express from "express";

import {
  createCoupon,
  deleteCoupon,
  getAllCoupon,
  updateCoupon,
} from "../controllers/coupon.js";
import { isAdmin, verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/", [verifyToken, isAdmin], createCoupon);
router.get("/", getAllCoupon);
router.put("/:id", [verifyToken, isAdmin], updateCoupon);
router.delete("/:id", [verifyToken, isAdmin], deleteCoupon);

export default router;
