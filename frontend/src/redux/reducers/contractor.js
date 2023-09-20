import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const contractorReducer = createReducer(initialState, {
  loadCreateContractorRequest: (state) => {
    state.isLoading = true;
  },

  //load contractor success

  loadCreateContractorSuccess: (state, action) => {
    state.isLoading = false;
    state.success = true;
    state.contractor = action.payload;
  },

  //load contractor failed
  loadCreateContractorFailed: (state, action) => {
    state.isLoading = false;
    state.success = false;
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
