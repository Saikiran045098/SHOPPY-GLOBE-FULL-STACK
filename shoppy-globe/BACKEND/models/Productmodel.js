import mongoose from "mongoose";


//  Connect to MongoDB and creating and connecting to MonoDB server
mongoose.connect("mongodb://localhost:27017/productsDB", {
})
.then(() => console.log(" Connected to MongoDB"))
.catch(err => console.error(" MongoDB connection error:", err));

//  Create Product Schema
const productSchema = new mongoose.Schema({
  id: Number,
  title: String,
  description: String,
  price: Number,
  thumbnail: String,
  category: String,
  rating: Number,
  stock: Number,
  discountPercentage: Number,
  thumbnail: String
});

const Product = mongoose.model("Product", productSchema);
export default Product