import { createReducer } from "@reduxjs/toolkit";
const initialState = {
  isLoading: true,
};

export const customerReducer = createReducer(initialState,{
  //request
  loadCustomerCreateRequest: (state) => {
    state.isLoading = true;
  },

  //load customer success
  loadCustomerCreateSuccess: (state, action) => {
    state.isLoading = false;
    state.customer = action.payload;
    state.success = true;
  },

  //load customer failed
  loadCustomerCreateFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },

  //clear errors

  clearErrors: (state) => {
    state.error = null;
  },
});
