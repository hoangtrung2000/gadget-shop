import Blog from "../mongodb/models/blog.js";
import asyncHandler from "express-async-handler";

export const createBlog = asyncHandler(async (req, res) => {
  const { title, description, category } = req.body;
  if (!title || !description || !category) throw new Error("Missing inputs");
  const response = await Blog.create(req.body);
  return res.status(201).json({
    success: response ? true : false,
    result: response ? response : "Cannot create a blog",
  });
});

export const updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (Object.keys(req.body).length === 0) throw new Error("Missing inputs");
  const response = await Blog.findByIdAndUpdate(id, req.body, { new: true });
  return res.status(200).json({
    success: response ? true : false,
    result: response ? response : "Cannot update the blog",
  });
});

export const getBlogById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const response = await Blog.findByIdAndUpdate(
    id,
    {
      // calling API, numberViews property will increase 1 unit
      $inc: { numberViews: 1 },
    },
    { new: true }
  )
    // get data from user collection to blog collection
    .populate("likes", "firstname lastname")
    .populate("dislikes", "firstname lastname");

  return res.status(200).json({
    success: response ? true : false,
    result: response ? response : "Cannot found the blog",
  });
});

export const getAllBlog = asyncHandler(async (req, res) => {
  const response = await Blog.find();
  return res.status(200).json({
    success: response ? true : false,
    result: response ? response : "Cannot found any blogs.",
  });
});

export const likeBlog = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { id } = req.params;
  const blog = await Blog.findById(id);
  const isDisliked = blog?.dislikes?.find(
    (userId) => userId.toString() === _id
  );
  if (isDisliked) {
    const response = await Blog.findByIdAndUpdate(
      id,
      { $pull: { dislikes: _id } },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      result: response ? response : "Something went wrong.",
    });
  }
  const isLiked = blog?.likes?.find((userId) => userId.toString() === _id);
  if (isLiked) {
    const response = await Blog.findByIdAndUpdate(
      id,
      { $pull: { likes: _id } },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      result: response ? response : "Something went wrong.",
    });
  } else {
    const response = await Blog.findByIdAndUpdate(
      id,
      { $push: { likes: _id } },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      result: response ? response : "Something went wrong.",
    });
  }
});

export const dislikeBlog = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { id } = req.params;
  const blog = await Blog.findById(id);
  const isLiked = blog?.likes?.find((userId) => userId.toString() === _id);
  if (isLiked) {
    const response = await Blog.findByIdAndUpdate(
      id,
      { $pull: { likes: _id } },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      result: response ? response : "Something went wrong.",
    });
  }
  const isDisLiked = blog?.dislikes?.find(
    (userId) => userId.toString() === _id
  );
  if (isDisLiked) {
    const response = await Blog.findByIdAndUpdate(
      id,
      { $pull: { dislikes: _id } },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      result: response ? response : "Something went wrong.",
    });
  } else {
    const response = await Blog.findByIdAndUpdate(
      id,
      { $push: { dislikes: _id } },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      result: response ? response : "Something went wrong.",
    });
  }
});

export const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const response = await Blog.findByIdAndDelete(id);
  return res.status(200).json({
    success: response ? true : false,
    result: response ? "Blog was deleted" : "Cannot deleted the blog",
  });
});
