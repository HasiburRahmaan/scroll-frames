import { configureStore } from "@reduxjs/toolkit";
import RootReducer from "./rootReducer";

export const store = configureStore({
  reducer: RootReducer,
  devTools: process.env.NODE_ENV !== 'production',
})

export type IRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
