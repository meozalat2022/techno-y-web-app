import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allProducts: [],
  loading: false,
  error: null,
};

const productSLice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getProductsStart: (state) => {
      state.loading = true;
    },
    getProductsSuccess: (state, action) => {
      state.loading = false;
      state.allProducts = action.payload;
      state.error = null;
    },
    getProductsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getProductsStart, getProductsSuccess, getProductsFailure } =
  productSLice.actions;

export default productSLice.reducer;
