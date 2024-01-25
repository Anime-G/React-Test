import {
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Option } from "antd/es/mentions";
import FormItem from "antd/es/form/FormItem";
import { useDispatch, useSelector } from "react-redux";
import { AddProperties, fetchProperties, fetchPropertiesforLease } from "../../Redux/Properties/Actions";
import { removeExtraSpace } from "../trimData";
import { AddLease } from "../../Redux/Leases/Actions";
import _ from "lodash";

const AddLeases = () => {
  const TenantsData = useSelector((state) => state?.tenants?.Data);

  const property = useSelector((state) => state.property?.data);
  const msg = useSelector((state) => state?.property?.result?.msg);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sdate, setsDate] = useState(Date.now("YYYY-m-d"));
  const [edate, seteDate] = useState(Date.now("YYYY-m-d"));
  
  //Upload of Form
  const onFinish = (values) => {
    console.log(values);

    let { name, emailid ,SDate,EDate,RentAmount,Properties} = values;
    if((SDate > EDate))
    {
        alert("Enter the Dates Correctly");
        return;
    }

    name = removeExtraSpace(name);
    emailid = removeExtraSpace(emailid);

    values = {  name, emailid,StartingDate:sdate,EndingDate:edate ,Properties,RentAmount};
    // console.log("Trimmed",values);
  
    dispatch(AddLease(values));
    navigate("/Leases");
  };
  
  // Fetching Tenants with useEffect []
  useEffect(() => {
    dispatch(fetchPropertiesforLease());
  }, []);

  //Main Form of Leasers
  const form = (
    <Form
      name="addLease"
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
        label="Leaser Name"
        name="name"
        rules={[
          {
            required: true,
            message: "Please input Lesers Name!",
          },
        ]}
      >
        <Input placeholder="Enter the name" />
      </Form.Item>
      {/* Address of Property*/}

      <Form.Item
        label="Emailid"
        name="emailid"
        rules={[
          {
            type: "email",
            required: true,
            message: "Please input Emailid!",
          },
        ]}
      >
        <Input placeholder="Enter The Emailid" allowClear />
      </Form.Item>
      {/* Available Rooms*/}

      <Form.Item
        label="Lease Staring Data"
        name="SDate"
        rules={[
          {
            required: true,

            message: "Please input Starting Date!",
          },
        ]}
      >
        <DatePicker
          placeholder="Select Starting Date"
          onChange={(date, dateString) => setsDate(dateString)}
          disabledDate={(current) => {
            return current && current < Date.now("YYYY-m-d");
          }}
          style={{ width: "100%" }}
        />
      </Form.Item>
      <Form.Item
        label="Lease Ending Date"
        name="EDate"
        rules={[
          {
            required: true,

            message: "Please input Ending Date!",
          },
        ]}
      >
        <DatePicker
        onChange={(date, dateString) => seteDate(dateString)}
          placeholder="Select Ending Date"
          disabledDate={(current) => {
            const d = new Date(sdate);
            return current && current < d;
          }}
          style={{ width: "100%" }}
        />
      </Form.Item>
      {/* Tenant selection */}
      <Form.Item label="Properties">
        <Space.Compact style={{ width: "100%" }}>
          <FormItem
            name="Properties"
            noStyle
            rules={[
              {
                required: true,
                message: "Please select the tenant!",
              },
            ]}
          >
            <Select
                placeholder="Select the property for Lease"
              rules={[
                {
                  required: true,
                  message: "Please select the Property!",
                },
              ]}
            >
              {property?.map((op) => {
                return (
                  <Option key={op.id} value={op.id}>
                    {op.name}
                  </Option>
                );
              })}
            </Select>
          </FormItem>
          
        </Space.Compact>
      </Form.Item>
      <Form.Item
        label="Rent Amount"
        name="RentAmount"
        rules={[
          {
            required: true,
            message: "Please input Rent Amount!",
          },
        ]}
      ><InputNumber min={500} placeholder="Enter The Emailid" style={{ width: "100%" }}  />
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
        title="Leases Information"
        style={{ width: "60%", margin: "20px auto" }}
      >
        {form}
      </Card>
    </div>
  );
};

export default AddLeases;
