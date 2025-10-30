import React, { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import store from "./Redux/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Spinner from "./spinner.jsx"; // Spinner component
import RegistrationForm from "./User/RegistratioForm.jsx";
import LoginForm from "./User/LoginForm.jsx";

// ✅ Lazy load components
const App = lazy(() => import("./App.jsx"));
const ProductList = lazy(() => import("./components/productlist.jsx"));
const ProductDetail = lazy(() => import("./components/productdetail.jsx"));
const Cart = lazy(() => import("./cart/cart.jsx"));
const Notfound = lazy(() => import("./components/Notfound.jsx"));
const Homemsg = lazy(() => import("./components/Homemsg.jsx"));
const Footer = lazy(() => import("./footer/Footer.jsx"));
const CheckoutPage = lazy(() => import("./checkout/checkoutpage.jsx"));

// ✅ Wrap each component inside Suspense boundary for route-level loading
const withSuspense = (Component) => (
  <Suspense fallback={<Spinner />}>
    <Component />
  </Suspense>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: withSuspense(App),
    children: [
      { path: "/", element: withSuspense(Homemsg) },
      { path: "products", element: withSuspense(ProductList) },
      { path: "product/:id", element: withSuspense(ProductDetail) },
      {path : "/register" ,element : withSuspense(RegistrationForm)},
      {path : "/login" ,element : withSuspense(LoginForm)},
      { path: "cart", element: withSuspense(Cart) },
      { path: "checkout", element: withSuspense(CheckoutPage) },
      { path: "footer", element: withSuspense(Footer) },
      { path: "*", element: withSuspense(Notfound) },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
