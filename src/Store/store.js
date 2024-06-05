import { combineReducers, configureStore } from "@reduxjs/toolkit";
import ProductSlice from "./ProductSlice";
import UserSlice from "./UserSlice";

const rootReducer = combineReducers({
  products: ProductSlice,
  userIsLogin: UserSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
