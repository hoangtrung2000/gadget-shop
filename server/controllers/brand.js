import asyncHandler from "express-async-handler";
import Brand from "../mongodb/models/brand.js";

export const createBrand = asyncHandler(async (req, res) => {
  const response = await Brand.create(req.body);
  return res.status(200).json({
    success: response ? true : false,
    result: response ? response : "Cannot create new brand",
  });
});

export const getAllBrand = asyncHandler(async (req, res) => {
  const response = await Brand.find().select("_id title");
  return res.status(200).json({
    success: response ? true : false,
    results: response ? response : "Not found any brands",
  });
});

export const updateBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const response = await Brand.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: response ? true : false,
    result: response ? response : `Cannot update the brand: ${id}`,
  });
});

export const deleteBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const response = await Brand.findByIdAndDelete(id);
  return res.status(200).json({
    success: response ? true : false,
    result: response ? response : `Something went wrong`,
  });
});
