import { createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
  name: "book",
  initialState: {
    booked: [],
  },
  reducers: {
    getBooked(state, action) {
      state.booked = action.payload;
    },
    addBooked(state, action) {
      state.booked = [...state.booked, action.payload];
    },
  },
});

export const bookActions = bookSlice.actions;

export default bookSlice.reducer;
