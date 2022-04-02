/*
import { createStore } from "redux";

const initialState = {
  cart: {},
  booked: [],
};

const reducer = (state = initialState, action) => {
  if (action.type === "LOADING") {
  }

  if (action.type === "SUCCESS") {
    return {
      ...state,
      booked: [...action.payload],
    };
  }

  if (action.type === "ERROR") {
  }

  if (action.type === "BOOKING") {
    const newBooking = action.payload;
    return {
      ...state,
      booked: [...state.booked, newBooking],
    };
  }

  return state;
};

const store = createStore(reducer);

export default store;
*/

import { configureStore } from "@reduxjs/toolkit";

import bookSlice from "./book-slice";

const store = configureStore({
  reducer: {
    book: bookSlice,
  },
});

export default store;
