import {
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import ProductSlice from "./ProductSlice";
import logger from "redux-logger";

const rootReducer = combineReducers({
  products: ProductSlice,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger)
});

export default store;
