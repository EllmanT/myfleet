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
  // load the companyName
  loadCompanyName: (state, action) => {
    state.loading = false;
    state.delivererName = action.payload;
  },
  //load user failed

  loadUserFailed: (state, action) => {
    state.loading = false;
    state.isAuthenticated = false;
    state.error = action.payload;
  },

  //getAllAdminsPageRequest

  getAllAdminsPageRequest: (state) => {
    state.isPageAdminsLoading = true;
  },
  getAllAdminsPageSuccess: (state, action) => {
    state.isPageAdminsLoading = false;
    state.adminsPage = action.payload;
  },
  setTotalCount: (state, action) => {
    // Add this new reducer case
    state.totalCount = action.payload;
  },

  getAllAdminsPageFailed: (state, action) => {
    state.isPageAdminsLoading = false;
    state.error = action.payload;
  },

  //updating the admin

  updateAdminRequest: (state) => {
    state.isUpdateAdmin = true;
  },
  updateAdminSuccess: (state, action) => {
    state.isUpdateAdmin = false;
    state.admin = action.payload;
  },
  updateAdminFailed: (state, action) => {
    state.isUpdateAdmin = false;
    state.error = action.payload;
  },

  // delete Admin of a shop
  deleteAdminRequest: (state) => {
    state.isLoading = true;
  },
  deleteAdminSuccess: (state, action) => {
    state.isLoading = false;
    state.message = action.payload;
  },
  deleteAdminFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  //clear Errors
  clearErrors: (state) => {
    state.error = null;
  },
});
