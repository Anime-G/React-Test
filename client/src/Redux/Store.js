import { configureStore } from "@reduxjs/toolkit";
import TenantReducer from "./Tenants/Reducer";
import PropertyReducer from "./Properties/Reducer";
import LeaseReducer from "./Leases/Reducer";

const store = configureStore({
  reducer: {
    tenants: TenantReducer,
    property: PropertyReducer,
    leases: LeaseReducer,
  },
});

export default store;
