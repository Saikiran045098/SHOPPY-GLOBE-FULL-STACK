import Cart from "../models/cartmodel.js";
import Product from "../models/Productmodel.js"; // Make sure this points to your product model

// Add to cart
export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, title, price, quantity, thumbnail,  } = req.body;
    console.log(userId,productId, title, price, quantity, thumbnail)

    //  Validate required fields
    if (!userId || !productId || !title || !price || !quantity) {
      return res.status(400).json({
        message: "Missing required fields: productId, title, price, or quantity",
      });
    }

    //  Validate data types
    if (typeof productId !== "number") {
      return res.status(400).json({ message: "productId must be a number" });
    }
    if (typeof quantity !== "number" || quantity < 1) {
      return res.status(400).json({ message: "quantity must be a number >= 1" });
    }

    //  Check if product exists in products collection
    const productExists = await Product.findOne({ id: productId });
    if (!productExists) {
      return res.status(404).json({
        message: `Product with ID ${productId} does not exist`,
      });
    }

    //  Check if item already in cart
    let existingItem = await Cart.findOne({ productId });
    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();
      return res.status(200).json({
        message: "Item quantity updated successfully",
        item: existingItem,
      });
    }

    // 5️ Add new cart item
    const newItem = new Cart({ userId, productId, title, price, quantity, thumbnail });
    await newItem.save();
    res.status(201).json({
      message: "Item added to cart successfully",
      item: newItem,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add item to cart",
      error: error.message,
    });
  }
};

//  Get all cart items
export const getCartItems = async (req, res) => {
  try {
    const userId = req.user.id; // set by verifyToken middleware
    const items = await Cart.find({ userId }); // fetch only items for this user

    if (!items || items.length === 0) {
      return res.status(404).json({ message: "No items found in cart" });
    }

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch cart items",
      error: error.message,
    });
  }
};

//  Update cart quantity
export const updateCartQuantity = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ message: "Product ID and quantity are required" });
    }

    const item = await Cart.findOneAndUpdate(
      { productId :Number(productId) },
      { quantity },
      { new: true }
    );

    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    res.status(200).json({
      message: "Cart item updated successfully",
      item,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update quantity",
      error: error.message,
    });
  }
};

//  Delete item
export const removeCartItem = async (req, res) => {
  try {
    const productId = Number(req.params.id);
    const deletedItem = await Cart.findOneAndDelete({ productId });


    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    //  Return remaining items after deletion
    const remainingItems = await Cart.find();

    res.status(200).json({
      message: "Item removed from cart successfully",
      deletedItem,
      remainingItems,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to remove item from cart",
      error: error.message,
    });
  }
};
