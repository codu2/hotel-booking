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
      booked: action.payload.map((booking) => booking),
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
