import express from "express";
import { insertCategory, insertProduct } from "../controllers/insertData.js";

const router = express.Router();

router.post("/", insertProduct);
router.post("/cate", insertCategory);

export default router;
