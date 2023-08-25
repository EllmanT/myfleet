import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
};

export const userReducer = createReducer(initialState, {
  //load user Request
  loadUserRequest: (state) => {
    state.loading = true;
  },
  //load userSuccess
  loadUserSuccess: (state, action) => {
    state.loading = false;
    state.isAuthenticated = true;
    state.user = action.payload;
  },
  //load user failed

  loadUserFailed: (state, action) => {
    state.loading = false;
    state.isAuthenticated = false;
    state.error = action.payload;
  },

  //clear Errors
  clearErrors: (state) => {
    state.error = null;
  },
});
