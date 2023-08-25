import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "../state/index";
import { userReducer } from "./reducers/user";

const Store = configureStore({
  reducer: {
    global: globalReducer,
    user: userReducer,
  },
});

export default Store;
