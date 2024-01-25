
import axios from "axios";
import { Add, Delete, Find, Update, fetching } from "./Types";

//fetch all Tenants
export const fetchTenants =  () => {
  
  return (dispatch)=>{
    
    axios.get("http://localhost:8000/Tenants/").then(data=>{
      // console.log("Action ",data.data);

      dispatch({type: fetching,payload:data.data});
    })
  }
};
//add Tenants
export const AddTenants=(data)=>
{
  return (dispatch)=>{
    axios.post("http://localhost:8000/Tenants/add",data).then((result)=>{
      dispatch({type: Add,payload:result.data});
    })
  }
}
//find Tenants
export const findTenants =  (id) => {
  
  return (dispatch)=>{
    
    axios.get("http://localhost:8000/Tenants/find/"+id).then(data=>{
      // console.log("Action ",data);
      dispatch({type: Find,payload:data.data});
    })
  }

};
//Update Tenants by Id
export const updateTenant =  (data) => {
  
  return (dispatch)=>{
    
    axios.patch("http://localhost:8000/Tenants/Update",data).then(data=>{
      console.log("Action ",data);
      dispatch({type: Update,payload:data.data});
    })
  }

};
//Delete Tenants by Id
export const deleteTenant = (id) => {
  
  return (dispatch)=>{
    
    axios.delete("http://localhost:8000/Tenants/delete/"+id).then(data=>{
      console.log("Action ",data.data);
      dispatch({type: Delete,payload:data.data});
    })
  }

};