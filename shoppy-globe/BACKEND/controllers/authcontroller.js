import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/userRegistermodel.js";



// Use a single source of truth for the secret and expiration
const JWT_SECRET = process.env.JWT_SECRET || "super_secret_key_1234567890";
const JWT_EXPIRES = process.env.JWT_EXPIRES || "1d";

const createToken = (user) => {
  // Always use the same secret and expiration
  return jwt.sign(
    { id: user.UserId, email: user.email }, // payload
    JWT_SECRET,                          // secret
    { expiresIn: JWT_EXPIRES }           // expiration
  );
};

// ===== REGISTER USER =====
export const registerUser = async (req, res) => {
  try {
    const { Fullname, email, password, confirmPassword } = req.body;

    if ( !Fullname || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      Fullname,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = createToken(newUser); //  consistent secret
    console.log("jwt register",JWT_SECRET);


    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        UserId: newUser.UserId,
        Fullname: newUser.Fullname,
        email: newUser.email,
      },
    });

  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ==== LOGIN USER =======
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = createToken(user); //  consistent secret

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        UserId: user.UserId,
        Fullname: user.Fullname,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
