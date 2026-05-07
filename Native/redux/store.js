import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import counterSlice from "./counterSlice";
const store = configureStore({
  reducer: {
    counter: counterSlice,
    cart: cartSlice
  }
});

export default store;