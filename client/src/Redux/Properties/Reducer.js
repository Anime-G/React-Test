import { Add, Find, NotLeased, Update, fetchOne, fetching } from "./Types";

const initialState = { Data: [] };
const PropertyReducer = (state = initialState, action) => {
  switch (action.type) {
    case fetching:
      console.log("Reducer", action.payload);
      return { ...state, Data: action.payload.data };
    case fetchOne:
      console.log("Reducer fetchone", action.payload.data);
      return {
        ...state,
        data: action.payload.data,
        Tenant: action.payload.Tenant,
      };
    case NotLeased:
      console.log("Reducer fetchone", action.payload);
      return {
        ...state,
        data: action.payload,
      };
    case Add:
      console.log("Reducer Add");

      return { ...state, result: action.payload };
    case Find:
      return { ...state, result: action.payload };
    case Update:
      return { result: action.payload };
    default:
      // console.log("Reducer Deafult :", action.type);
      return state;
  }
};
export default PropertyReducer;
