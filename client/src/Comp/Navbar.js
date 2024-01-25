import React, { useState } from "react";
import {HomeFilled, UserOutlined, UserSwitchOutlined} from '@ant-design/icons'
import { Menu } from "antd";
import { Link, Route, Routes } from "react-router-dom";
import AddProperty from "./Property/AddProperty";
import AddTenanat from "./Tenants/AddTenanat";
import TenantHome from "./Tenants/TenantHome";
import EditTenants from "./Tenants/EditTenants";
import Page404 from "./Page404";
import PropertyHome from "./Property/PropertyHome";
import ViewProperty from "./Property/ViewProperty";
import EditProperty from "./Property/EditProperty";
import LeaseHome from "./Leases/LeaseHome";
import AddLeases from "./Leases/AddLeases";
import EditLeases from "./Leases/EditLeases";
const Navbar = () => {
  const items = [
    {
      label: <Link to="/">Home</Link>,
      key: "Home",
      icon: <HomeFilled />,
    },{
      label: <Link to="/Tenants">Tenants</Link>,
      key: "Tenants",
      icon: <UserOutlined />,
    },{
      label: <Link to="/Leases">Leases</Link>,
      key: "Leases",
      icon: <UserSwitchOutlined />,
    },
  ];
  const [current, setCurrent] = useState("Home");
  const onClick = (e) => {
    // console.log("click ", e);
    setCurrent(e.key);
  };
  return <div><Menu theme="dark" onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
    <Routes>
        <Route path="/" element={<PropertyHome/>}/>
        <Route path="/Tenants" element={<TenantHome/>} />
        <Route path="/Leases" element={<LeaseHome/>} />
        <Route path="/Property/:id" element={<ViewProperty/>} />
        <Route path="/Tenants/Edit/:id" element={<EditTenants/>} />
        <Route path="/Property/Edit/:id" element={<EditProperty/>} />
        <Route path="/Leases/Edit/:id" element={<EditLeases/>} />
        <Route path="/addProperty" element={<AddProperty/>} />
        <Route path="/addTenant" element={<AddTenanat/>} />
        <Route path="/addLease" element={<AddLeases/>} />
        <Route path="*" element={<Page404/>}/>
    </Routes>
  </div>;
};

export default Navbar;
