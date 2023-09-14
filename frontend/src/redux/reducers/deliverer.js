import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const delivererReducer = createReducer(initialState, {
  //load createdeliverer request

  loadCreateDeliverer: (state) => {
    state.isLoading = true;
  },

  //create deliverer success
  createDelivererSuccess: (state, action) => {
    state.isLoading = false;
    state.deliverer = action.payload;
    state.success = true;
  },

  //create deliverer failed
  createDelivererFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },

  //errors clearring

  clearErrors: (state) => {
    state.error = null;
  },
});
