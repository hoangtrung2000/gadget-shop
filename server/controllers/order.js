import Order from "../mongodb/models/order.js";
import Coupon from "../mongodb/models/coupon.js";
import User from "../mongodb/models/user.js";
import asyncHandler from "express-async-handler";
import processCouponValue from "../utils/convertCoupon.js";

export const createOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { cid } = req.body;
  const userCart = await User.findById(_id)
    .select("cart")
    .populate("cart.product", "title price");

  const products = userCart?.cart?.map((item) => ({
    product: item.product._id,
    count: item.quantity,
    color: item.color,
  }));

  let total = userCart?.cart?.reduce(
    (sum, current) => current.product.price * current.quantity + sum,
    0
  );
  const createData = { products, total, orderBy: _id };

  if (cid) {
    const coupon = await Coupon.findById(cid).select("name discount");
    const discount = processCouponValue(coupon.discount, total);
    createData.total = discount;
    createData.coupon = coupon;
  }

  const response = await Order.create(createData);
  return res.status(200).json({
    success: response ? true : false,
    result: response ? response : "Something went wrong.",
  });
});

export const updateStatusOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const response = await Order.findByIdAndUpdate(id, { status }, { new: true });
  return res.status(200).json({
    success: response ? true : false,
    result: response ? response : "Cannot update the status of the order",
  });
});

export const getUserOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const response = await Order.find({ orderBy: _id });
  return res.status(200).json({
    success: response ? true : false,
    result: response ? response : "Cannot find your orders.",
  });
});

export const getAllOrder = asyncHandler(async (req, res) => {
  const response = await Order.find().populate("orderBy", "email");
  return res.status(200).json({
    success: response ? true : false,
    result: response ? response : "Cannot find any orders.",
  });
});
