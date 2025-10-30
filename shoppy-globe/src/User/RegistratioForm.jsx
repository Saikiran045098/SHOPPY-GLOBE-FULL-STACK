import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./RegistrationForm.css";
import { registerAPI } from "../../BACKEND/UserApi.js";

export default function RegistrationForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();

  // ✅ Check login status when component mounts
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  // ✅ Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null);
    setSubmitted(false);
  };

  // ✅ Handle registration
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await registerAPI({
        Fullname: form.name,
        email: form.email,
        password: form.password,
        confirmPassword: form.confirmPassword,
      });

      if (response.success === false || response.message) {
        setError(response.message || "Registration failed");
      } else {
        setSubmitted(true);
        setError(null);

        // ✅ Store token if backend sends it
        if (response.token) {
          localStorage.setItem("token", response.token);
        }

        // ✅ Redirect to homepage after successful registration
        navigate("/");
      }
    } catch (err) {
      console.error("Register API call failed:", err);
      setError("Server error, please try again later");
    }
  };

  // ✅ Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    alert("You have been logged out successfully!");
    navigate("/"); // redirect to home
  };

  // ✅ Redirect to login page
  const handleLoginRedirect = () => {
    navigate("/login");
  };

  // ✅ If already logged in, show logged-in message
  if (loggedIn) {
    return (
      <div className="reg-page">
        <div className="reg-container">
          <h2 className="reg-title">You are already logged in!</h2>
          <p className="reg-success">Would you like to log out?</p>
          <button className="reg-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    );
  }

  // ✅ Normal registration form
  return (
    <div className="reg-page">
      <div className="reg-container">
        <form className="reg-form" onSubmit={handleSubmit}>
          <h2 className="reg-title">Create Your Account</h2>

          {error && <div className="reg-error">⚠ {error}</div>}
          {submitted && (
            <div className="reg-success">
              🎉 Registration successful, welcome {form.name}!
            </div>
          )}

          <div className="reg-field">
            <label className="reg-label" htmlFor="name">
              Full Name
            </label>
            <input
              className="reg-input"
              type="text"
              name="name"
              id="name"
              value={form.name}
              onChange={handleChange}
              placeholder="John Doe"
            />
          </div>

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
            <input
              className="reg-input"
              type="password"
              name="password"
              id="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
            />
          </div>

          <div className="reg-field">
            <label className="reg-label" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              className="reg-input"
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
            />
          </div>

          <button className="reg-btn" type="submit">
            Register
          </button>

          <button
            type="button"
            className="reg-btn secondary-btn"
            onClick={handleLoginRedirect}
          >
            Already have an account? Login
          </button>
        </form>
      </div>
    </div>
  );
}
