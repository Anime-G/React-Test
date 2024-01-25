
import axios from "axios";
import { Add, Delete, Find, Update, fetching } from "./Types";

//fetch all Leases
export const fetchLeases =  () => {
  
  return (dispatch)=>{
    
    axios.get("http://localhost:8000/Leases/").then(data=>{
      // console.log("Action ",data.data);

      dispatch({type: fetching,payload:data.data});
    })
  }
};
//add Leases
export const AddLease=(data)=>
{
  return (dispatch)=>{
    axios.post("http://localhost:8000/Leases/add",data).then((result)=>{
      dispatch({type: Add,payload:result.data});
    })
  }
}
//find Leases
export const findLeases =  (id) => {
  
  return (dispatch)=>{
    
    axios.get("http://localhost:8000/Leases/find/"+id).then(data=>{
      console.log("Action ",data);
      dispatch({type: Find,payload:data.data});
    })
  }

};
//Update Leases by Id
export const updateLease =  (data) => {
  
  return (dispatch)=>{
    
    axios.patch("http://localhost:8000/Leases/Update",data).then(data=>{
      console.log("Action ",data);
      dispatch({type: Update,payload:data.data});
    })
  }

};
//Delete Leases by Id
export const deleteLease = (id) => {
  
  return (dispatch)=>{
    
    axios.delete("http://localhost:8000/Leases/delete/"+id).then(data=>{
      console.log("Action ",data.data);
      dispatch({type: Delete,payload:data.data});
    })
  }

};