import express from "express";
import { loginUser } from "../controllers/authcontroller.js";
const loginrouter = express.Router(); // ✅ router name as loginrouter

// POST /api/users/login
loginrouter.post("/login", loginUser);

export default loginrouter;
