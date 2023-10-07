import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const vehicleReducer = createReducer(initialState, {
  //load vehicle request
  loadVehicleCreateRequest: (state) => {
    state.isLoading = true;
  },
  //load vehicle added success
  loadVehicleCreateSuccess: (state, action) => {
    state.isLoading = false;
    state.success = true;
    state.vehicle = action.payload;
  },
  //load vehicle added failed
  loadVehicleCreateFailed: (state, action) => {
    state.isLoading = false;
    state.succes = false;
    state.error = action.payload;
  },

  //get all vehicles request

  getAllVehiclesCompanyRequest: (state) => {
    state.isLoading = true;
  },

  //get all vehicles company success
  getAllVehiclesCompanySuccess: (state, action) => {
    state.isLoading = false;
    state.vehicles = action.payload;
  },
  // get all vehicles company failed
  getAllVehiclesCompanyFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  //clear errors
  clearErrors: (state) => {
    state.error = null;
  },
  //clear success messages
  clearMessages: (state) => {
    state.success = null;
  },
});
