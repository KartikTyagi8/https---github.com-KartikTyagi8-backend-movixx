import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middleware/Error.js";

export const getMyProfile = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};

export const newUser = async (req, res, next) => {
  try {
    const { name, username, password } = req.body;

    let user = await User.findOne({ username });

    if (user) {
      return next(new ErrorHandler("User already exists!", 404));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({
      name,
      username,
      password: hashedPassword,
    });

    sendCookie(user, res, "Registered Succesfully!", 201);
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username }).select("+password");

    if (!user) {
      return next(new ErrorHandler("Invalid Username or Password", 404));
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return next(new ErrorHandler("Invalid Username or Password", 404));
    }

    sendCookie(user, res, `Welcome back, ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};
export const logoutUser = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
      })
      .json({
        success: true,
        user: req.user,
      });
  } catch (error) {
    next(error);
  }
};
