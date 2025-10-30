// cartAPI.js
import { setCart, addItem, updateItem, removeItem, clearCart } from "../src/Redux/cartSlice.js";

const API_URL = "http://localhost:5000/api/cart";

//  Load all cart items
export const loadCart = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      if (res.status === 401) throw new Error("Unauthorized: Invalid token");
      throw new Error("Failed to fetch cart items");
    }

    const data = await res.json();
    dispatch(setCart(data));
  } catch (error) {
    console.error("Error loading cart:", error);
    if (error.message.includes("Unauthorized")) {
      localStorage.removeItem("token");
      alert("Session expired. Please log in again.");
      window.location.href = "/login";
    }
  }
};

//  Add a new item
export const addToCart = (item) => async (dispatch) => {
  const token = localStorage.getItem("token");

  const modifiedItem = {
    ...item,
    productId: item.id,
    quantity: 1,
  };

  console.log("mi", modifiedItem);

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(modifiedItem),
    });

    if (!res.ok) {
      if (res.status === 401) throw new Error("Unauthorized: Invalid token");
      throw new Error("Failed to add item");
    }

    const data = await res.json();
    console.log(data)
    dispatch(addItem(data.item )); // prefer backend response
  
  } catch (error) {
    console.error("Error adding item:", error);
    if (error.message.includes("Unauthorized")) {
      localStorage.removeItem("token");
      alert("Session expired. Please log in again.");
      window.location.href = "/login";
    }
  }
};

//  Update quantity
export const updateCartQuantity = (productId, quantity) => async (dispatch) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(API_URL, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId, quantity }),
    });

    if (!res.ok) {
      if (res.status === 401) throw new Error("Unauthorized: Invalid token");
      throw new Error("Failed to update item");
    }

    const data = await res.json();
    dispatch(updateItem(data.item));
  } catch (error) {
    console.error("Error updating quantity:", error);
    if (error.message.includes("Unauthorized")) {
      localStorage.removeItem("token");
      alert("Session expired. Please log in again.");
      window.location.href = "/login";
    }
  }
};

//  Remove item
export const deleteCartItem = (productId) => async (dispatch) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`${API_URL}/${productId}`, {
      method: "DELETE",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      if (res.status === 401) throw new Error("Unauthorized: Invalid token");
      throw new Error("Failed to delete item");
    }

    await res.json();
    dispatch(removeItem(productId));
  } catch (error) {
    console.error("Error removing item:", error);
    if (error.message.includes("Unauthorized")) {
      localStorage.removeItem("token");
      alert("Session expired. Please log in again.");
      window.location.href = "/login";
    }
  }
};

// 🧹 Clear entire cart (frontend only)
export const clearAllCart = () => (dispatch) => {
  dispatch(clearCart());
};
