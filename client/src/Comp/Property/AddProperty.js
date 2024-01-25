import { Button, Card, Form, Input, InputNumber, Select, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Option } from "antd/es/mentions";
import FormItem from "antd/es/form/FormItem";
import { useDispatch, useSelector } from "react-redux";
import { AddProperties } from "../../Redux/Properties/Actions";
import { removeExtraSpace } from "../trimData";
import { fetchTenants } from "../../Redux/Tenants/Actions";

const AddProperty = () => {
  const TenantsData = useSelector((state) => state?.tenants?.Data);
  
  const property=useSelector((state)=>state.property);
  const msg=useSelector((state)=>state?.property?.result?.msg);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  //Upload of Form
  const onFinish = (values) => {
    let {name,address}=values;
    name=removeExtraSpace(name);
    address=removeExtraSpace(address);
    values={...values,name,address};
    console.log(values);
    console.log("Received values of form:", values);
    dispatch(AddProperties(values));
    navigate("/");
  };
  //options of Tenant
  const [options, setOptions] = useState([]);

  // Fetching Tenants with useEffect []

  const Tenants = async () => {
  };

  useEffect(() => {
    dispatch(fetchTenants())
    
  }, []);

  //Main Form of property
  const form = (
    <Form
      name="addproperty"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        margin: "0px auto",
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      autoComplete="off"
    >
      {/* name of Property*/}

      <Form.Item
        label="Property Name"
        name="name"
        rules={[
          {
            required: true,
            message: "Please input Property Name!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      {/* Address of Property*/}

      <Form.Item
        label="Property Address"
        name="address"
        rules={[
          {
            required: true,
            message: "Please input Property Address!",
          },
        ]}
      >
        <TextArea
          placeholder="Enter The Property Address"
          allowClear
          style={{ resize: "none" }}
        />
      </Form.Item>
      {/* Available Rooms*/}

      <Form.Item
        label="Available Rooms"
        name="available_rooms"
        rules={[
          {
            required: true,
            
            message: "Please input No of Rooms!",
          },
        ]}
      >
        <InputNumber
        min={1}
          placeholder="Enter The Available Rooms"
          style={{ width: "100%" }}
        />
      </Form.Item>
      {/* Tenant selection */}
      <Form.Item label="Tenants">
        <Space.Compact style={{ width: "100%" }}>
          <FormItem
            name={[ "tenants"]}
            noStyle
            rules={[
              {
                required: true,
                message: "Please select the tenant!",
              },
            ]}
          >
            <Select
              mode="multiple"
              rules={[
                {
                  required: true,
                  message: "Please selec the tenant!",
                },
              ]}
            >
              {TenantsData.map((op) => {
                return (
                  <Option key={op.id} value={op.id}>
                    {op.name}[{op.emailid}]
                  </Option>
                );
              })}
            </Select>
          </FormItem>
            <Link to="/addTenant">
              <Button type="dashed">Add</Button>
            </Link>
        </Space.Compact>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        {/* submit button */}
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
  return (
    <div>
      <Card
        title="Property Information"
        style={{ width: "60%", margin: "20px auto" }}
      >
        {form}
      </Card>
    </div>
  );
};

export default AddProperty;
