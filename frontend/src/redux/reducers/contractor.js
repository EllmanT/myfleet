import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    isLoading : true,
}

export const contractorReducer = createReducer(initialState,{

    "loadContractorCreateRequest": (state)=>{
        state.isLoading = true;

    },

    //load contractor success

    "loadContractorCreateSuccess":(state,action)=>{
        state.isLoading = false;
        state.success = true;
        state.contractor = action.payload;
    },

    //load contractor failed
    "loadContractorCreateFailed":(state,action)=>{
        state.isLoading  = false;
        state.success= false;
        state.error = action.payload;
    },

    //clear errors
    "clearErrors":(state)=>{
        state.error = null
    }
})