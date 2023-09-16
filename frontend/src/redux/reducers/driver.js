import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const driverReducer = createReducer(initialState, {
  //load vehicle request
  loadDriverCreateRequest: (state) => {
    state.isLoading = true;
  },
  //load vehicle added success
  loadDriverCreateSuccess: (state, action) => {
    state.isLoading = false;
    state.success = true;
    state.vehicle = action.payload;
  },
  //load vehicle added failed
  loadDriverCreateFailed: (state, action) => {
    state.isLoading = false;
    state.succes = false;
    state.error = action.payload;
  },
  //clear errors
  clearErrors: (state) => {
    state.error = null;
  },
});
