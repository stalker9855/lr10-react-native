import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      return action.payload;
    },
    addProduct: (state, action) => {
      return [...state, action.payload];
    },
    deleteProduct: (state, action) => {
      return state.filter((product) => product.id !== action.payload);
    },
  },
});

export const { setProducts, addProduct, deleteProduct } = productsSlice.actions;

export default productsSlice.reducer;
