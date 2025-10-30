import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./ProductItem.css";
import { addToCart } from "../../BACKEND/cartAPI.js";

function ProductItem({ product, onaddToCart}) {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent link navigation
    const item = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.thumbnail || product.image,
      thumbnail:product.thumbnail,
      
    };

    // Add to Redux cart
    dispatch(addToCart(item));

    // Trigger optional parent handler (for logging, toast, etc.)
    if (onaddToCart) onaddToCart(item);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      state={{ product }}
      className="product-link"
    >
      <div className="product-card">
        <div className="product-image-wrapper">
          {product.thumbnail || product.image ? (
            <img
              src={product.thumbnail || product.image}
              alt={product.title}
              className="product-image"
            />
          ) : (
            <div className="product-no-image">No Image</div>
          )}
        </div>

        <div className="product-info">
          <h3 className="product-name">{product.title}</h3>
          {product.rating && (
            <div className="product-rating">
              <span className="stars">⭐</span>
              <span className="rating-value">{product.rating.toFixed(1)}</span>
              <span className="rating-outof">/ 5</span>
            </div>
          )}

          <p className="product-description">
            {product.description?.slice(0, 60)}...
          </p>

          {product.brand && (
            <p className="product-brand">Brand: {product.brand}</p>
          )}

          <p className="product-price">Price : ${product.price}</p>

          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            🛒 Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
}

export default ProductItem;
