import { createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
  name: "book",
  initialState: {
    booked: [],
    bookedInfo: {},
  },
  reducers: {
    getBooked(state, action) {
      state.booked = action.payload;
    },
    addBooked(state, action) {
      state.booked = [...state.booked, action.payload];
    },
    addBookedInfo(state, action) {
      state.bookedInfo = Object.assign(state.bookedInfo, action.payload);
    },
  },
});

export const bookActions = bookSlice.actions;

export default bookSlice.reducer;
