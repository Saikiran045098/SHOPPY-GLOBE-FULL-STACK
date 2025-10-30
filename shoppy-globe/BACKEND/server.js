
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import products from "./Apidata.js";
import { routes } from "./routes/Productroutes.js";
import Cartrouter from "./routes/cartroutes.js";
import Userrouter from "./routes/userRegisterroutes.js";
import loginrouter from "./routes/UserLoginroutes.js";



const app = express();
dotenv.config();
// Middleware
app.use(express.json()); 
app.use(cors());         

// Connect to MongoDB Compass
mongoose
  .connect( "mongodb://localhost:27017/productsDB", {
  })
  .then(() => console.log(" MongoDB Connected"))
  .catch((err) => console.error(" MongoDB Connection Error:", err));



//  Product & Cart routes setup
const router = express.Router();
routes(router); // Register all product-related routes
app.use("/api", router); // Base URL: /api/products (from Productroutes)
app.use("/api", Cartrouter); // Base URL: /api/cart (from Cartrouter)


//  User registration route setup
app.use("/api/users", Userrouter); // Base URL: /api/users/register
app.use("/api/users", loginrouter);

//  Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(` Server running on http://localhost:${PORT}`)
);
