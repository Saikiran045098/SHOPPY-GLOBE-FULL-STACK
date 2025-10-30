import React from "react";
import { addToCart,updateCartQuantity,deleteCartItem } from "../../BACKEND/cartAPI";
import { useDispatch } from "react-redux";
import {setQuantity,
} from "../Redux/cartSlice";
import "./cartitem.css";

export default function CartItem({ item }) {
  const dispatch = useDispatch();

  return (
    <div className="cart-item">
      {/* ==== LEFT: Product Image ==== */}
      <div className="cart-item-image">
        {item.thumbnail ? (
          <img src={item.thumbnail} alt={item.title} />
        ) : (
          <div className="no-img">No Image</div>
        )}
      </div>

      {/* ==== MIDDLE: Product Info ==== */}
      <div className="cart-item-details">
        <h3 className="product-title">{item.title}</h3>
        <p className="product-brand">Brand: <span>Fashion Hub</span></p>
        <p className="product-price">${item.price.toFixed(2)}</p>

        <div className="qty-controls">

        <button onClick={() => dispatch(updateCartQuantity(item.productId, Math.max(1, item.quantity - 1)))}className="qty-btn">−</button>
 
          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={(e) => {
              const val = e.target.value === "" ? "" : Number(e.target.value);
              if (val === "") return;
              dispatch(setQuantity({ id: item.productId, quantity: Math.max(1, val) }));
            }}
          />
          <button onClick={() => dispatch(updateCartQuantity(item.productId,item.quantity+1))} className="qty-btn">+</button>
        </div>
      </div>

      {/* ==== RIGHT: Price + Remove ==== */}
      <div className="cart-item-actions">
        <p className="item-total">${(item.price * item.quantity).toFixed(2)}</p>
        <button
          className="remove-btn"
          onClick={() => dispatch( deleteCartItem(item.productId))}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
