import Coupon from "../mongodb/models/coupon.js";
import asyncHandler from "express-async-handler";

export const createCoupon = asyncHandler(async (req, res) => {
  const { name, discount, expiry } = req.body;
  if (!name || !discount || !expiry) throw new Error("Missing inputs");
  const response = await Coupon.create({
    ...req.body,
    expiry: Date.now() + +expiry * 24 * 3600 * 1000,
  });
  return res.status(200).json({
    success: response ? true : false,
    result: response ? response : "Cannot create a new coupon.",
  });
});

export const updateCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (Object.keys(req.body).length === 0) throw new Error("Missing inputs");
  if (req.body.expiry)
    req.body.expiry = Date.now() + +req.body.expiry * 24 * 3600 * 1000;
  const response = await Coupon.findByIdAndUpdate(id, req.body, { new: true });
  return res.status(200).json({
    success: response ? true : false,
    result: response ? response : "Cannot update the coupon.",
  });
});
export const getAllCoupon = asyncHandler(async (req, res) => {
  const response = await Coupon.find().select("-createdAt -updatedAt");
  return res.status(200).json({
    success: response ? true : false,
    result: response ? response : "Not found any coupons.",
  });
});
export const deleteCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const response = await Coupon.findByIdAndDelete(id);
  return res.status(200).json({
    success: response ? true : false,
    result: response ? response : "Something went wrong",
  });
});
