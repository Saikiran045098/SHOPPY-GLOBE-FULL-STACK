  import mongoose from "mongoose";
import User from "../models/userRegistermodel.js";
import bcrypt from "bcrypt"; // use bcryptjs for better compatibility
import jwt from "jsonwebtoken"


export const registerUser = async (req, res) => {
  try {
    const { UserId, Firstname, Lastname, email, password, confirmPassword } = req.body;

    // 1️⃣ Validate fields
    if (!UserId || !Firstname || !Lastname || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required, including UserId" });
    }

    // 2️⃣ Validate UserId format
    const userIdPattern = /^USER\d+$/;
    if (!userIdPattern.test(UserId)) {
      return res.status(400).json({ message: "UserId must start with 'USER' followed by numbers" });
    }

    // 3️⃣ Check uniqueness of UserId
    const existingUserId = await User.findOne({ UserId });
    if (existingUserId) {
      return res.status(400).json({ message: "UserId already exists" });
    }

    // 4️⃣ Check uniqueness of email
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // 5️⃣ Optional: check unique combination of Firstname + Lastname
    const existingName = await User.findOne({ Firstname, Lastname });
    if (existingName) {
      return res.status(400).json({ message: "User with the same name already exists" });
    }

    // 6️⃣ Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // 7️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
  
    
    // 8️⃣ Create and save user
    const newUser = new User({
      UserId,
      Firstname,
      Lastname,
      email,
      password: hashedPassword, // store hashed password
    });

    await newUser.save();

    // 9️⃣ Send response with all stored details (excluding confirmPassword)
    res.status(201).json({
      message: "User registered successfully",
      user: newUser // includes UserId, Firstname, Lastname, email, hashed password, _id, __v
    });

  } catch (error) {
    console.error("Error in registerUser:", error);
    res.status(500).json({ message: "Server error" });
  }
};
  