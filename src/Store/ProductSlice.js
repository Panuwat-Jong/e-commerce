import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL_PRODUCTS } from "../Utils/BaseUrl";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get(`${BASE_URL_PRODUCTS}?limit=${30}`);
    return response.data;
  }
);

export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async () => {
    const response = await axios.get(
      `${BASE_URL_PRODUCTS}?limit=${196}`
    );
    return response.data;
  }
);


const ProductSlice = createSlice({
  name: "products",
  initialState: {
    item: [],
    itemFull: [],
    cart: [],
    wishlist: [],
    loading: false,
    error: null,
  },
  reducers: {
    addCartProduct: (state) => {
      if (typeof window !== "undefined") {
        if (localStorage.getItem("cart")) {
          state.cart = JSON.parse(localStorage.getItem("cart"));
        } else {
          state.cart = [];
        }
      }
    },
    addWishlistProduct: (state) => {
      if (typeof window !== "undefined") {
        if (localStorage.getItem("wishlist")) {
          state.wishlist = JSON.parse(localStorage.getItem("wishlist"));
        } else {
          state.wishlist = [];
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          (state.loading = true), (state.error = null);
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state, action) => {
          state.loading = false;
          if (action.type.includes("fetchAllProducts")) {
            state.itemFull = action.payload;
          } else if (action.type.includes("fetchProducts")) {
            state.item = action.payload;
          }   
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        }
      );
  },
});
export const { addCartProduct, addWishlistProduct } = ProductSlice.actions;
export default ProductSlice.reducer;
