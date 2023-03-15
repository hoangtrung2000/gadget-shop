import User from "../mongodb/models/user.js";
import asyncHandler from "express-async-handler";
import { generateRefreshToken, generateToken } from "../middlewares/jwt.js";
import jwt from "jsonwebtoken";

export const register = asyncHandler(async (req, res) => {
  const { email, password, firstname, lastname } = req.body;
  if (!email || !password || !firstname || !lastname) {
    return res.status(400).json({
      success: false,
      message: "Missing information",
    });
  }
  const user = await User.findOne({ email });
  if (user) throw new Error("Email has already existed.");
  else {
    const newUser = await User.create(req.body);
    return res.status(200).json({
      success: newUser ? true : false,
      message: newUser
        ? "Register successfully. Please login!"
        : "Fail to register.",
    });
  }
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Missing information",
    });
  }
  const user = await User.findOne({ email }); // user is an instance of Mongoose
  if (user && (await user.checkPassword(password))) {
    const { role, password, ...userData } = user.toObject(); // convert to plain object
    const accessToken = generateToken(user._id, role);
    const refreshToken = generateRefreshToken(user._id);
    await User.findByIdAndUpdate(user._id, { refreshToken }, { new: true });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // milliseconds of 7 days
    });
    return res.status(200).json({
      success: true,
      accessToken,
      userData,
    });
  } else {
    throw new Error("Invalid credentials");
  }
});

export const getCurrent = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id).select("-refreshToken -password -role");
  if (user) {
    return res.status(200).json({
      success: true,
      result: user ? user : "User not found",
    });
  }
});

export const refreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie && !cookie.refreshToken)
    throw new Error("No refresh token in cookie!");
  const decode = jwt.verify(cookie.refreshToken, process.env.JWT_SECRET);
  // check whether the token matches the one is stored in database.
  const user = await User.findOne({
    _id: decode._id,
    refreshToken: cookie.refreshToken,
  });
  return res.status(200).json({
    success: user ? true : false,
    newToken: user
      ? generateToken(user._id, user.role)
      : "Refresh token invalid",
  });
});

export const logOut = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie && cookie.refreshToken)
    throw new Error("No refresh token in cookie!");
  await User.findOneAndUpdate(
    { refreshToken: cookie.refreshToken },
    { refreshToken: "" },
    { new: true }
  );
  res.clearCookie("refreshToken", { httpOnly: true, secure: true });
  return res.status(200).json({
    success: true,
    message: "Logout successfully!",
  });
});
