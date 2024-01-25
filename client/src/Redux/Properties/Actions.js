
import axios from "axios";
import { Add, Find, NotLeased, Update, fetchOne, fetching } from "./Types";
import { Delete } from "../Tenants/Types";

//fetch all Properties
export const fetchProperties =  () => {
  
  return (dispatch)=>{
    
    axios.get("http://localhost:8000/Properties/").then(data=>{
      console.log("Action ",data.data);

      dispatch({type: fetching,payload:data.data});
    })
  }
};
//perticular property
export const fetchProperty=(id)=>{
  return (dispatch)=>{
    
    axios.get("http://localhost:8000/Properties/property/"+id).then(data=>{
      console.log("Action ",data.data);
      dispatch({type: fetchOne,payload:data.data});
    })
  }
}
//add Properties
export const AddProperties=(data)=>
{
  console.log("Action",data);
  return (dispatch)=>{
    axios.post("http://localhost:8000/Properties/add",data).then((result)=>{
      dispatch({type: Add,payload:result.data});
    })
  }
}
//find Properties
export const findProperty =  (id) => {
  
  return (dispatch)=>{
    
    axios.get("http://localhost:8000/Properties/find/"+id).then(data=>{
      // console.log("Action ",data);
      dispatch({type: Find,payload:data.data});
    })
  }

};
//properties which are not leses
export const fetchPropertiesforLease=()=>{
  
  return (dispatch)=>{
    
    axios.get("http://localhost:8000/Properties/findnotLease").then(data=>{
      console.log("Action ",data);
      dispatch({type: NotLeased,payload:data.data.propertiesforlease});
    })
  }
}
//Update Properties by Id
export const updatePropety =  (data) => {
  
  return (dispatch)=>{
    
    axios.patch("http://localhost:8000/Properties/Update",data).then(data=>{
      // console.log("Action ",data);
      dispatch({type: Update,payload:data.data});
    })
  }

};
//Delete Property by Id
export const deleteProperty = (id) => {
  
  return (dispatch)=>{
    
    axios.delete("http://localhost:8000/Properties/delete/"+id).then(data=>{
      console.log("Action ",data.data);
      dispatch({type: Delete,payload:data.data});
    })
  }

};