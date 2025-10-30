import { createSlice } from "@reduxjs/toolkit";

const initialState = { items: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => { state.items = action.payload; },
    addItem: (state, action) => {
      const existing = state.items.find(i => i.productId === action.payload.productId);
      if (existing) existing.quantity += action.payload.quantity || 1;
      else state.items.push(action.payload);
    },
    setQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find(i => i.productId === productId);
      if (item) item.quantity = Math.max(1, Number(quantity));
    },
    updateItem: (state, action) => {
      const index = state.items.findIndex(i => i.productId === action.payload.productId);
      if (index !== -1) state.items[index] = action.payload;
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(i => i.productId !== action.payload);
    },
    clearCart: (state) => { state.items = []; },
  },
});

export const { setCart, addItem, setQuantity, updateItem, removeItem, clearCart } = cartSlice.actions;
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotalCount = (state) => state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectCartSubtotal = (state) => state.cart.items.reduce((total, item) => total + item.quantity * (item.price || 0), 0);

export default cartSlice.reducer;
