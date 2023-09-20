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
  //clear errors
  clearErrors: (state) => {
    state.error = null;
  },
  clearMessages:(state)=>{
    state.success=null;
  }
});
