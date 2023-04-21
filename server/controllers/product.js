import Product from "../mongodb/models/product.js";
import asyncHandler from "express-async-handler";
import slugify from "slugify";

export const createProduct = asyncHandler(async (req, res) => {
  if (Object.keys(req.body).length === 0) throw new Error("Missing inputs");
  if (req.body.title) req.body.slug = slugify(req.body.title);
  const newProduct = await Product.create(req.body);
  return res.status(200).json({
    success: newProduct ? true : false,
    result: newProduct ? newProduct : "Cannot create a product",
  });
});

export const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const response = await Product.findById(id);
  return res.status(200).json({
    success: response ? true : false,
    result: response ? response : "Not found",
  });
});

export const getAllProducts = asyncHandler(async (req, res) => {
  const response = await Product.find();
  return res.status(200).json({
    success: response ? true : false,
    result: response ? response : "Not found any products.",
  });
});

export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (Object.keys(req.body).length !== 0 && req.body.title)
    req.body.slug = slugify(req.body.title);
  const response = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: response ? true : false,
    result: response ? response : "Cannot update the product.",
  });
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) throw new Error("Missing inputs");
  const response = await Product.findByIdAndDelete(id);
  return res.status(200).json({
    success: response ? true : false,
    result: response
      ? `Product has ID:${id} was deleted`
      : "Something went wrong",
  });
});
