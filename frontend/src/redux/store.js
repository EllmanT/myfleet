import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "../state/index";
import { userReducer } from "./reducers/user";
import { customerReducer } from "./reducers/customer";
import { contractorReducer } from "./reducers/contractor";
import { vehicleReducer } from "./reducers/vehicle";
import { delivererReducer } from "./reducers/deliverer";
import { driverReducer } from "./reducers/driver";
import {tripReducer} from "./reducers/trip"
 
const Store = configureStore({
  reducer: {
    global: globalReducer,
    user: userReducer,
    customer: customerReducer,
    contractor: contractorReducer,
    vehicle: vehicleReducer,
    deliverer: delivererReducer,
    driver: driverReducer,
    trip:tripReducer
  },
});

export default Store;
