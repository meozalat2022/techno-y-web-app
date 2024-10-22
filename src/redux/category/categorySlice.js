import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allCategories: [],
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    getCategoriesStart: (state) => {
      state.loading = true;
    },
    getCategoriesSuccess: (state, action) => {
      state.allCategories = action.payload;
      state.loading = false;
      state.error = null;
    },
    getCategoriesFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  getCategoriesFailure,
  getCategoriesStart,
  getCategoriesSuccess,
} = categorySlice.actions;
export default categorySlice.reducer;
