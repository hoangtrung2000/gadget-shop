import asyncHandler from "express-async-handler";
import blogCategory from "../mongodb/models/blogCategory.js";

export const createCategory = asyncHandler(async (req, res) => {
  const response = await blogCategory.create(req.body);
  return res.status(200).json({
    success: response ? true : false,
    result: response ? response : "Cannot create category",
  });
});

export const getAllCategory = asyncHandler(async (req, res) => {
  const response = await blogCategory.find().select("_id title");
  return res.status(200).json({
    success: response ? true : false,
    results: response ? response : "Not found any category",
  });
});

export const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const response = await blogCategory.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: response ? true : false,
    result: response ? response : `Cannot update category: ${id}`,
  });
});

export const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const response = await blogCategory.findByIdAndDelete(id);
  return res.status(200).json({
    success: response ? true : false,
    result: response ? response : `Something went wrong`,
  });
});
