import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productslice";
import cartReducer from "./cartSlice"
const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
  },
});

export default store;
