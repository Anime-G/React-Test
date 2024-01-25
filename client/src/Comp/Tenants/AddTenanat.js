
import { Button, Card, Form, Input, message } from "antd";
import axios from "axios";
import React,{useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddTenants } from "../../Redux/Tenants/Actions";
import { useNavigate } from "react-router-dom";

const AddTenanats = () => {
  const dispatch=useDispatch();
  const tenants=useSelector((state)=>state.tenants);
  const msg=useSelector((state)=>state?.tenants?.result?.msg);
  const merr=useSelector((state)=>state?.tenants?.result?.err);
  const [formdata] = Form.useForm();
  const navigate=useNavigate();
  
  const onFinish =async (values) => {
    
    dispatch(AddTenants(values));
    console.log("AddTenantPage Tenants: ",tenants);
    formdata.resetFields();
    
    navigate("/Tenants");
    
    
  };
  
 
  const form = (
    <Form
    form={formdata}
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    
    autoComplete="off"
  >
    <Form.Item
      label="Name"
      name="name"
      rules={[
        {
          required: true,
          message: 'Please input your Name!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="email"
      name="emailid"
      rules={[
        {
          required: true,
          type: "email",
          message: 'Please input your Email-id!',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
  );
  return (
    <div>
      <Card
        title="Tenant's Information"
        style={{ width: "60%", margin: "20px auto" }}
      >
        {form}
      </Card>
    </div>
  );
};

export default AddTenanats;
