import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../BACKEND/cartAPI";
import "./productdetails.css";

function ProductDetail() {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch(); // setup Redux dispatch

  const productFromState = location.state?.product;
  const [product, setProduct] = useState(productFromState || null);
  const [loading, setLoading] = useState(!productFromState);
  const [error, setError] = useState(null);

  //  Fetch product details only if not passed through state
  useEffect(() => {
    if (!productFromState) {
      const fetchProductDetail = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/products/${id}`);
          if (!response.ok) throw new Error(`Failed to fetch product details`);
          const data = await response.json();
          setProduct(data);
        } catch (err) {
          setError(err.message || "Something went wrong!");
        } finally {
          setLoading(false);
        }
      };
      fetchProductDetail();
    }
  }, [id, productFromState]);

  if (loading) return <p className="loading-text">Loading product details...</p>;
  if (error || !product)
    return (
      <div className="error-container">
        <p className="error-text">{error || "Product not found."}</p>
        <Link to="/products" className="back-button">
          ⬅ Back to Products
        </Link>
      </div>
    );

  //  Add to Cart function using Redux
  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="product-detail-container">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="detail-image"
      />
      <div className="detail-info">
        <h2 className="detail-title">{product.title}</h2>
        <p>
          <strong>Brand:</strong> {product.brand}
        </p>
        <p>
          <strong>Category:</strong> {product.category}
        </p>
        <p>
          <strong>Price:</strong> ${product.price}
        </p>
<div className="product-rating-container">
           <span className="rating"><strong>Rating : </strong>{" "}</span>
           {product.rating ? (
             <span className="product-rating">
               {Array.from({ length: 5 }, (_, index) => (
                 <span key={index} className="star">
                   {index < Math.round(product.rating) ? "⭐" : "☆"}
                 </span>
               ))}
               <span className="rating-value">{product.rating.toFixed(1)}</span>
               <span className="rating-outof"> / 5</span>
             </span>
           ) : (
             "No rating"
           )}
         </div>


        <p>
           {product.description}
        </p>

        {/* 🛒 Add to Cart button */}
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          🛒 Add to Cart
        </button>

        <Link to="/products" className="back-button">
          ⬅ Back to Products
        </Link>
      </div>
    </div>
  );
}

export default ProductDetail;
