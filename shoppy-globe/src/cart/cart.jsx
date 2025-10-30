import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCartItems, selectCartSubtotal } from "../Redux/cartSlice";
import CartItem from "./cartitem";
import "./Cart.css";
import { loadCart } from "../../BACKEND/cartAPI.js";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadCart());
  }, [dispatch]);

  return (
    <div className="cart-container">
      <h2 className="cart-header">🛒 Your Shopping Cart</h2>

      {items.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty!</p>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {items.map((it) => (
              <CartItem key={it.productId} item={it} />
            ))}
          </div>

          <div className="cart-summary">
            <div className="subtotal">
              <strong>Subtotal:</strong> ${subtotal.toFixed(2)}
            </div>

            <button
              className="checkout-btn"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout →
            </button>
          </div>
        </>
      )}
    </div>
  );
}
