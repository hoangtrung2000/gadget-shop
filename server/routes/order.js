import express from "express";

import { isAdmin, verifyToken } from "../middlewares/verifyToken.js";
import {
  createOrder,
  getAllOrder,
  getUserOrder,
  updateStatusOrder,
} from "../controllers/order.js";

const router = express.Router();
// GET METHOD
router.get("/admin", [verifyToken, isAdmin], getAllOrder);
router.get("/", verifyToken, getUserOrder);
// PUT METHOD
router.put("/status/:id", [verifyToken, isAdmin], updateStatusOrder);
// POST METHOD
router.post("/", verifyToken, createOrder);

export default router;
