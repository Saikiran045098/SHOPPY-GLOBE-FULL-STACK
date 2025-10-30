import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  searchTerm: "",
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    // ✅ Add this reducer
    clearSearch: (state) => {
      state.searchTerm = "";
    },
  },
});

export const { setProducts, setSearchTerm, clearSearch } = productSlice.actions;

// Selectors
export const selectAllProducts = (state) => state.products.products;
export const selectSearchTerm = (state) => state.products.searchTerm;
export const selectFilteredProducts = (state) => {
  const term = (state.products.searchTerm || "").toLowerCase().trim();
  if (!term) return state.products.products;
  return state.products.products.filter((p) => {
    const title = p.title?.toLowerCase() || "";
    const desc = p.description?.toLowerCase() || "";
    const brand = p.brand?.toLowerCase() || "";
    return title.includes(term) || desc.includes(term) || brand.includes(term);
  });
};

export default productSlice.reducer;
