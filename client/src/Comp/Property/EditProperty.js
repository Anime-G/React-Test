import React, { useEffect, useState } from "react";
import { Button, Card, Form, Input, InputNumber, Select, Space, message } from "antd";
import { removeExtraSpace } from "../trimData";
import FormItem from "antd/es/form/FormItem";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TextArea from "antd/es/input/TextArea";
import { Option } from "antd/es/mentions";

import { fetchTenants } from "../../Redux/Tenants/Actions";
import { fetchProperty, updatePropety } from "../../Redux/Properties/Actions";

const EditProperty = () => {
  const params = useParams();
  const { id } = params;
  const property = useSelector((state) => state?.property);
  const name = useSelector((state) => state?.property?.data?.name);
  const PropertyTenants = useSelector((state) => state?.property?.Tenant);
  const available_rooms = useSelector(
    (state) => state?.property?.data?.available_rooms
  );
  const address = useSelector((state) => state?.property?.data?.address);
  const TenantsData = useSelector((state) => state?.tenants?.Data);
  const [form, setForm] = useState();
  const dispatch = useDispatch();
  const [formdata] = Form.useForm();
    const navigate=useNavigate();
  useEffect(() => {
    dispatch(fetchTenants());
    dispatch(fetchProperty(id));

    setForm(
      <Form
        name="addproperty"
        form={formdata}
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
        initialValues={{}}
        onFinish={onFinish}
        autoComplete="off"
      >
      <Form.Item
          label="Property id"
          hidden
          name="id"
          rules={[
            {
              required: true,
              message: "Please input Property id!",
            },
          ]}
        >
          <Input />
        </Form.Item>
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
              name={["tenants"]}
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
  }, []);
 
    const PropertyTenantsid=[]
    console.log("PropertyTenants:", PropertyTenants);
    
    PropertyTenants?.forEach(tenant => {
        PropertyTenantsid.push(tenant.id);
    });
    formdata.setFieldsValue({
        id,
      name,
      available_rooms,
      address,
      tenants: PropertyTenantsid,
    });
  // setOptions(TenantsData);
  const onFinish = (values) => {
    let { name, address } = values;
    name = removeExtraSpace(name);
    address = removeExtraSpace(address);
    values = { ...values, name, address };

    console.log("Received values of form:", values);
    dispatch(updatePropety(values));
    message.success("Data Upadated");
    navigate("/");

  };
  //Main Form of property

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

export default EditProperty;
