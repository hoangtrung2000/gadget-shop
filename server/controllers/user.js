import User from "../mongodb/models/user.js";
import asyncHandler from "express-async-handler";

export const register = asyncHandler(async (req, res) => {
  const { email, password, firstname, lastname } = req.body;
  if (!email || !password || !firstname || !lastname) {
    return res.status(400).json({
      success: false,
      message: "Missing information",
    });
  } else {
    const newUser = await User.create(req.body);
    return res.status(200).json({
      success: newUser ? true : false,
      response: newUser,
    });
  }
});
