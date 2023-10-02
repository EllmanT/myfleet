import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const driverReducer = createReducer(initialState, {
  //load vehicle request
  loadCreateDriverRequest: (state) => {
    state.isLoading = true;
  },
  //load vehicle added success
  loadCreateDriverSuccess: (state, action) => {
    state.isLoading = false;
    state.success = true;
    state.vehicle = action.payload;
  },
  //load vehicle added failed
  loadCreateDriverFailed: (state, action) => {
    state.isLoading = false;
    state.success = false;
    state.error = action.payload;
  },

  //load all drivers of a company

  getAllDriversCompanyRequest: (state) => {
    state.isLoading = true;
  },
  //load all drivers of a company success
  getAllDriversCompanySuccess: (state, action) => {
    state.isLoading = false;
    state.success = true;
    state.drivers = action.payload;
  },

  //load all drivers of a company failed
  getAllDriversCompanyFailed: (state, action) => {
    state.isLoading = false;
    state.success = false;
    state.error = action.payload;
  },

  //clear errors
  clearErrors: (state) => {
    state.error = null;
  },
  clearMessages: (state) => {
    state.success = null;
  },
});
