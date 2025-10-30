

import React, { useState } from "react";
import "./LoginForm.css"; // Link to separate CSS file
import { loginAPI } from "../../BACKEND/UserApi.js";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSubmitted(false);
  };
  const navigate = useNavigate()
  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError(true);
      setSubmitted(false);
    } else {
      setError(false);
      setSubmitted(true);
    }
     try {
        const response = await loginAPI({
         
          email: form.email,
          password: form.password,
         
        });
    
        // 3️⃣ Handle API errors
        if (response.success === false || response.message) {
          setError(response.message || "Login failed");
          setSubmitted(false);
        } else {
          // 4️⃣ Registration successful
          setSubmitted(true);
          setError(null);
    
          // Optionally redirect to login page
          navigate("/");
        }
      } catch (err) {
        console.error("Login API call failed:", err);
        setError("Server error, please try again later");
        setSubmitted(false);
      }
  };

  return (
    <div className="reg-page">
      <div className="reg-container">
        <form className="reg-form" onSubmit={handleSubmit}>
          <h2 className="reg-title">Login to Your Account</h2>

          {error && <div className="reg-error">⚠ All fields are required</div>}
          {submitted && (
            <div className="reg-success">🎉 Login successful!</div>
          )}

          <div className="reg-field">
            <label className="reg-label" htmlFor="email">
              Email Address
            </label>
            <input
              className="reg-input"
              type="email"
              name="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              placeholder="example@email.com"
            />
          </div>

          <div className="reg-field">
            <label className="reg-label" htmlFor="password">
              Password
            </label>
            <div className="password-wrapper">
              <input
                className="reg-input"
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
              />
              <span
                className="show-pass-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
          </div>

          <div className="forgot-pass">
            <a href="#">Forgot Password?</a>
          </div>

          <button className="reg-btn" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
  