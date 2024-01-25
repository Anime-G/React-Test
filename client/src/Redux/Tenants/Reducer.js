import { Add, Delete, Find, Update, fetching } from "./Types";

const initialState = { Data: [] };
const TenantReducer = (state = initialState, action) => {
  switch (action.type) {
    case fetching:
      // console.log("Reducer",action.payload);
      return {  Data: action.payload };
    case Add:
      console.log("Reducer ",action.payload);
      return { result: action.payload };
    case Find:
      return { result: action.payload };
    case Update:
      
      return { result: action.payload };
    case Delete:
      // console.log("Deleted ",action.payload);
      return {result: action.payload, Data: action.payload.tenants };
    default:
      // console.log("Reducer Deafult :", action.type);
      return state;
  }
};
export default TenantReducer;
