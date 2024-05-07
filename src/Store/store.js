import { combineReducers, configureStore } from "@reduxjs/toolkit";
import ProductSlice from "./ProductSlice";
import logger from "redux-logger";
import UserSlice from "./UserSlice";

const rootReducer = combineReducers({
  products: ProductSlice,
  userIsLogin: UserSlice,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
