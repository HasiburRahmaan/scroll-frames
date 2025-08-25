import { combineReducers } from "@reduxjs/toolkit";
import loaderReducer from "./slices/loaderSlice";
import toastReducer from "./slices/toastSlice";
const RootReducer = combineReducers({
  loader: loaderReducer,
  toast: toastReducer,
})

export default RootReducer;