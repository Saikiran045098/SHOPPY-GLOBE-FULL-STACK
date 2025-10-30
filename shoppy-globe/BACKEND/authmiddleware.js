import dotenv from "dotenv";
import jwt from "jsonwebtoken"; 

dotenv.config(); 

const JWT_EXPIRES = process.env.JWT_EXPIRES
const JWT_SECRET = process.env.JWT_SECRET || "super_secret_key_1234567890";

dotenv.config(); 
export const verifyToken = (req, res, next) => {
  console.log("Headers received:", req.headers); // 🔹 check if header arrives
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    console.log("Authorization header missing");
    return res.status(401).json({ message: "Authorization header missing" });
  }

  const token = authHeader.split(' ')[1]?.trim();
  console.log("token recived")
  


  if (!token) {
    console.log("Token missing");
    return res.status(401).json({ message: "Token missing" });
  }

  try {
     jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log("jwt",JWT_SECRET);
      
    
      console.log("❌ Invalid or expired token:", err.message);
      return res.status(401).json({ message: "Invalid or expired token" });
    } else {
      console.log("✅ Token valid", decoded);
      req.user = decoded; // attach payload to request
      next();
    }
  });
  } catch (err) {
    console.log("Token verification failed:", err.message);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
