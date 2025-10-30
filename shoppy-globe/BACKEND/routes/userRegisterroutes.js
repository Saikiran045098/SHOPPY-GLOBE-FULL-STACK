// backend/routes/userRoutes.js
import express from "express";
import { registerUser } from "../controllers/authcontroller.js";
const Userrouter = express.Router();

// POST route → register new user
Userrouter.post("/register", registerUser);

export default Userrouter;
