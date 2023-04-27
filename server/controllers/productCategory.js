import productCategory from "../mongodb/models/productCategory.js";
import asyncHandler from "express-async-handler";

export const createCategory = asyncHandler(async (req, res) => {
  const response = await productCategory.create(req.body);
  return res.status(200).json({
    success: response ? true : false,
    result: response ? response : "Cannot create category",
  });
});

export const getAllCategory = asyncHandler(async (req, res) => {
  const response = await productCategory.find().select("_id title");
  return res.status(200).json({
    success: response ? true : false,
    results: response ? response : "Not found any category",
  });
});

export const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const response = await productCategory.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: response ? true : false,
    result: response ? response : `Cannot update category: ${id}`,
  });
});

export const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const response = await productCategory.findByIdAndDelete(id);
  return res.status(200).json({
    success: response ? true : false,
    result: response ? response : `Something went wrong`,
  });
});
