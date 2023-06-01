import Product from "../mongodb/models/product.js";
import asyncHandler from "express-async-handler";
import slugify from "slugify";
import { formatMongoDb } from "../utils/format.js";

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
  const queries = { ...req.query };
  // Separate fields in query object
  const excludeFields = ["limit", "sort", "page", "fields"];
  excludeFields.forEach((e) => delete queries[e]);

  // Formate to suitable for operator in MongoDB
  // query: title=''  price[gt]=5000
  // {title: '', price: {$gt:5000}}
  const formatQueries = formatMongoDb(queries);

  // Filtering
  if (queries?.title) {
    formatQueries.title = { $regex: queries.title, $options: "i" };
  }
  let queryCommand = Product.find(formatQueries);

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    queryCommand = queryCommand.sort(sortBy);
  }

  // fields limit
  if (req.query.fields) {
    const fieldLimit = req.query.fields.split(",").join(" ");
    queryCommand = queryCommand.select(fieldLimit);
  }

  // Pagination
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;
  const skip = (page - 1) * limit;
  queryCommand.skip(skip).limit(limit);

  try {
    const response = await queryCommand.exec();
    const counts = await Product.find(formatQueries).countDocuments();
    return res.status(200).json({
      success: response ? true : false,
      counts,
      results: response ? response : "Cannot get any products.",
    });
  } catch (error) {
    throw new Error(error.message);
  }
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

export const ratingProduct = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { star, comment, id } = req.body;
  if (!star || !id) throw new Error("Missing inputs");
  const product = await Product.findById(id);
  const alreadyRating = product?.ratings?.find(
    (e) => e.postedBy.toString() === _id
  ); //ObjectId -> string
  if (alreadyRating) {
    // update star & comment
    await Product.updateOne(
      {
        ratings: { $elemMatch: alreadyRating },
      },
      { $set: { "ratings.$.star": star, "ratings.$.comment": comment } },
      { new: true }
    );
  } else {
    // create star & comment
    await Product.findByIdAndUpdate(
      id,
      {
        $push: { ratings: { star, comment, postedBy: _id } },
      },
      { new: true }
    );
  }

  // Total rating
  const updateProduct = await Product.findById(id);
  const countRating = updateProduct.ratings.length;
  const totalRating = updateProduct.ratings.reduce(
    (sum, rating) => sum + +rating.star,
    0
  );
  updateProduct.totalRatings =
    Math.round((totalRating * 10) / countRating) / 10;
  await updateProduct.save();

  return res.status(200).json({
    success: true,
    updateProduct,
  });
});

export const uploadImages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!req.files) throw new Error("something went wrong");
  const response = await Product.findByIdAndUpdate(
    id,
    {
      $push: { images: { $each: req.files.map((image) => image.path) } },
    },
    { new: true }
  );
  return res.status(200).json({
    success: response ? true : false,
    result: response ? response : "Cannot upload images",
  });
});
