import mongoose from "mongoose";
import User from "../models/userRegistermodel.js";
import bcrypt from "bcrypt";


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️ Validate fields
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // 2️ Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 3️ Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 4️ Send success response with user details (exclude hashed password)
    res.status(200).json({
      message: "Login successful",
      user: {
        UserId: user.UserId,
        Firstname: user.Firstname,
        Lastname: user.Lastname,
        email: user.email
      }
    });

  } catch (error) {
    console.error("Error in loginUser:", error);
    res.status(500).json({ message: "Server error" });
  }
};
