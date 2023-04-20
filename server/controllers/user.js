import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { generateRefreshToken, generateToken } from "../middlewares/jwt.js";
import User from "../mongodb/models/user.js";
import generateHtml from "../utils/generateHtml.js";
import sendMail from "../utils/sendMail.js";
import cryptoHash from "../utils/cryptoHash.js";

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
    const { role, password, refreshToken, ...userData } = user.toObject(); // convert to plain object
    const accessToken = generateToken(user._id, role);
    const newRefreshToken = generateRefreshToken(user._id);
    await User.findByIdAndUpdate(
      user._id,
      { refreshToken: newRefreshToken },
      { new: true }
    );
    res.cookie("refreshToken", newRefreshToken, {
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
      success: user ? true : false,
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

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.query;
  if (!email) throw new Error("Missing email");
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");
  const resetToken = user.createPasswordChangedToken();
  await user.save();
  const html = generateHtml(resetToken);
  const data = {
    email,
    html,
  };
  const result = await sendMail(data);
  return res.status(200).json({
    success: true,
    result,
  });
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { token, password } = req.body;
  const passwordResetToken = cryptoHash(token);
  const user = await User.findOne({
    passwordResetToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) throw new Error("Invalid reset token");
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  user.passwordChangeAt = Date.now();
  await user.save();
  return res.status(200).json({
    success: user ? true : false,
    message: user ? "Password changed successfully" : "Something went wrong",
  });
});

export const getUsers = asyncHandler(async (req, res) => {
  const response = await User.find().select("-refreshToken -password -role");
  return res.status(200).json({
    success: response ? true : false,
    users: response,
  });
});

export const deleteUser = asyncHandler(async (req, res) => {
  const { _id } = req.query;
  if (!_id) throw new Error("Missing inputs");
  const response = await User.findByIdAndDelete(_id);
  console.log(response);
  return res.status(200).json({
    success: response ? true : false,
    message: response ? `${response.email} was deleted` : "No user to delete",
  });
});

export const updateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  if (!_id || Object.keys(req.body).length === 0)
    throw new Error("Missing inputs");
  const response = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  }).select("-password -role -refreshToken");
  return res.status(200).json({
    success: response ? true : false,
    updatedUser: response ? response : "Something went wrong",
  });
});

export const updateUserByAdmin = asyncHandler(async (req, res) => {
  const { uid } = req.params;
  if (Object.keys(req.body).length === 0) throw new Error("Missing inputs");
  const response = await User.findByIdAndUpdate(uid, req.body, {
    new: true,
  }).select("-password -role -refreshToken");
  return res.status(200).json({
    success: response ? true : false,
    updatedUser: response ? response : "Something went wrong",
  });
});
