import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { value: [] },
  reducers: {
    add: (state, action) => {
      state.value.push(action.payload);
    },
    remove: (state, action) => {
      state.value = state.value.filter((e) => e.title !== action.payload.title)
    }
  }
});


export const { add, remove } = cartSlice.actions;
export default cartSlice.reducer;