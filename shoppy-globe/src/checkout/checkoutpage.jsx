import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./CheckoutPage.css";

function CheckoutPage() {
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    paymentMethod: "card",
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [orderDetails, setOrderDetails] = useState({});

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateOrderId = () =>
    "ORD" + Math.floor(100000 + Math.random() * 900000);

  const getDeliveryDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 5);
    return date.toLocaleDateString("en-IN", {
      weekday: "short",
      day: "2-digit",
      month: "short",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!cartItems.length) {
      alert("Your cart is empty!");
      return;
    }

    if (!formData.name || !formData.email || !formData.address) {
      alert("Please fill in all required fields!");
      return;
    }

    const newOrder = {
      id: generateOrderId(),
      name: formData.name,
      total: totalAmount.toFixed(2),
      delivery: getDeliveryDate(),
    };

    setOrderDetails(newOrder);
    setShowSuccess(true);
    dispatch({ type: "cart/clearCart" });
  };

  // 🕒 Auto redirect to Home page after 5 seconds once success popup is shown
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 5000);

      return () => clearTimeout(timer); // cleanup
    }
  }, [showSuccess, navigate]);

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Checkout</h2>

      <div className="checkout-content">
        {/* LEFT SIDE — ORDER SUMMARY */}
        <div className="order-summary">
          <h3>Order Summary</h3>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cartItems.map((item, index) => (
              <div key={index} className="checkout-item">
                <div>
                  <p className="item-name">{item.title}</p>
                  <p className="item-qty">Qty: {item.quantity}</p>
                </div>
                <p className="item-price">${item.price * item.quantity}</p>
              </div>
            ))
          )}
          <hr />
          <h4 className="total-amount">Total: ${totalAmount.toFixed(2)}</h4>
        </div>

        {/* RIGHT SIDE — FORM */}
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h3>Shipping Details</h3>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="address"
            placeholder="Full Address"
            value={formData.address}
            onChange={handleChange}
            required
          />

          <h3>Payment Method</h3>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
          >
            <option value="card">Credit / Debit Card</option>
            <option value="upi">UPI</option>
            <option value="cod">Cash on Delivery</option>
          </select>

          <button type="submit" className="place-order-btn">
            Place Order
          </button>
        </form>
      </div>

      {/* SUCCESS POPUP */}
      {showSuccess && (
        <div className="order-success-popup">
          <div className="success-box">
            <div className="checkmark">✔</div>
            <h3>Order Placed Successfully!</h3>
            <p className="thank-text">Thank you for shopping with us 🎉</p>

            <div className="order-details">
              <p>
                <strong>Order ID:</strong> {orderDetails.id}
              </p>
              <p>
                <strong>Customer:</strong> {orderDetails.name}
              </p>
              <p>
                <strong>Total Paid:</strong> ${orderDetails.total}
              </p>
              <p>
                <strong>Expected Delivery:</strong> {orderDetails.delivery}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CheckoutPage;
