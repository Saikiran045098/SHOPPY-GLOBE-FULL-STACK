import React from "react";
import "./Homemsg.css";
import { Link } from "react-router-dom";
import ProductList from "./productlist";
import Footer from "../footer/Footer";

function Homemsg() {
  return (
    <div>
    <section className="landing-section">
      <div className="landing-content">
        <div className="text-content">
          <h1>
            Welcome to <span>Shoppy Globe</span>
          </h1>
          <p>
            Discover premium products, seamless shopping, and unbeatable deals —
            all in one place. Experience a faster, smarter, and more delightful way
            to shop.
          </p>
          <Link to="/products" className="shop-now">
            Shop Now
          </Link>
        </div>

        <div className="image-content">
          <img
            src="shopping.jpg"
            alt="Shoppy Globe"
          />
        </div>
      </div>
     
    </section>
    
       <ProductList />
      <Footer/>
    </div>
  );
}

export default Homemsg;
