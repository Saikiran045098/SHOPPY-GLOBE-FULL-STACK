import express from "express";
import { verifyToken } from "../authmiddleware.js";
import { 
    addToCart,
    getCartItems,
    updateCartQuantity,
    removeCartItem
} from "../controllers/cartcontroller.js";

const Cartrouter = express.Router();

// All cart routes are protected using verifyToken middleware
Cartrouter.post("/cart", verifyToken, addToCart);
Cartrouter.get("/cart", verifyToken, getCartItems);
Cartrouter.put("/cart", verifyToken, updateCartQuantity);
Cartrouter.delete("/cart/:id", verifyToken, removeCartItem);

export default Cartrouter;
