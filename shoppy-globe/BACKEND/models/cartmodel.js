import mongoose from "mongoose";


// --- Cart Schema  ---
const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: String, 
      required: true,
    },
    productId: Number, // product id
    title: String,
    price: Number,
    category: String,
    thumbnail: String,
    rating: Number,
    stock: Number,
    discountPercentage: Number,
    quantity: {
      type: Number,
      required: true,
      default: 1,
      min: 1,
    },
  },
);

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
