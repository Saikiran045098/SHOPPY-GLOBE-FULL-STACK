import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useProducts from "./useproducts";
import ProductItem from "./productitem";

import {
  selectFilteredProducts,
  setSearchTerm,
  clearSearch,
  selectSearchTerm,
  setProducts, // <-- make sure this exists in your slice
} from "../Redux/productslice";
import "./Productlist.css";

function ProductList() {
  const dispatch = useDispatch();
  const { products: fetchedProducts, loading, error } = useProducts();
  const products = useSelector(selectFilteredProducts);
  const searchTerm = useSelector(selectSearchTerm);


  const handleChange = (e) => dispatch(setSearchTerm(e.target.value));
  const handleClear = () => dispatch(clearSearch());
  // Load fetched products into Redux store when available
  useEffect(() => {
    if (fetchedProducts.length > 0) {
      dispatch(setProducts(fetchedProducts));
    }
  }, [fetchedProducts, dispatch]);

  

  const handleAddToCart = (product) => {
    console.log("Added to cart:", product);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-text">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return <p className="error-text">Error: {error}</p>;
  }
  return (
    <>
     <h1 className="products">Products</h1>

      <div className="search-bar">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleChange}
            className="search-input"
          />
          <button onClick={handleClear} className="clear-btn">
            Clear
          </button>
        </div>


      {products.length === 0 ? (
      <div className="no-results">
      <p>No products match your search.</p>
      <p>Please try different keywords.</p>
      </div>
      ) : (
     <div className="product-grid">
     {products.map((p) => (
      <ProductItem key={p.id} product={p} onAddToCart={handleAddToCart} />
    ))}
    </div>
)}
</>
  );
}

export default ProductList;
