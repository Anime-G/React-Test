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
import moment from 'moment';
// import customParseFormat from 'dayjs/plugin/customParseFormat';


import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Option } from "antd/es/mentions";
import FormItem from "antd/es/form/FormItem";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPropertiesforLease,
  findProperty,
} from "../../Redux/Properties/Actions";
import { removeExtraSpace } from "../trimData";
import { findLeases, updateLease } from "../../Redux/Leases/Actions";
import _ from "lodash";
import dayjs from "dayjs";

const EditLeases = () => {
  const LeasesData = useSelector((state) => state?.leases?.result?.LeasesData);

  const property = useSelector((state) => state.property?.data);
  
  const leasedproperty = useSelector(
    (state) => state?.leases?.result?.PropertyData
  );
  
  const msg = useSelector((state) => state?.property?.result?.msg);

  const name = useSelector((state) => state?.leases?.result?.LeasesData?.name);
  const emailid = useSelector(
    (state) => state?.leases?.result?.LeasesData?.emailid
  );
  const StartingDate =useSelector(
      (state) => state?.leases?.result?.LeasesData?.StartingDate
      );
      
    // const StartingDate="2000-01-09";
  const EndingDate = useSelector(
    (state) => state?.leases?.result?.LeasesData?.EndingDate
  );
  const Properties = useSelector(
    (state) => state?.leases?.result?.LeasesData?.Properties
  );
  const RentAmount = useSelector(
    (state) => state?.leases?.result?.LeasesData?.RentAmount
  );
  const [options,setoptions]=useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formdata] = Form.useForm();
  const [form, setform] = useState();
  const params = useParams();
  const { id } = params;

  //Upload of Form
  const onFinish = (values) => {
    console.log(values);

    let { id, name, emailid, SDate, EDate, RentAmount, Properties } = values;
    if (SDate > EDate) {
      alert("Enter the Dates Correctly");
      return;
    }

    name = removeExtraSpace(name);
    emailid = removeExtraSpace(emailid);
    
    values = {
      id,
      name,
      emailid,
      StartingDate: sdate,
      EndingDate: edate,
      Properties,
      RentAmount,
    };
   
   
    console.log("Trimmed", values);

    dispatch(updateLease(values));
    navigate("/Leases");
  };
  console.log("leased", leasedproperty);
 
  useEffect(() => {
    dispatch(fetchPropertiesforLease());
    dispatch(findLeases(id));
    
    
  }, []);

  console.log("StartingDate",LeasesData);
  
  const [sdate, setsDate] = useState();
  const [edate, seteDate] = useState(EndingDate);
  
 
  let obj = {
    name,
    id,
    emailid,
    
    SDate:dayjs(StartingDate,"YYYY/MM/DD"),
    EDate:dayjs(EndingDate,"YYYY/MM/DD"),
    Properties:leasedproperty?.id,
    RentAmount,
  };
  console.log(obj);
   useEffect(()=>{
    
      formdata.setFieldsValue(obj);
   })
  
  //Main Form of Leasers
  console.log(StartingDate);
  return (
    <div>
      <Card
        title="Leases Information"
        style={{ width: "60%", margin: "20px auto" }}
      >
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
            margin: "0px auto",
            maxWidth: 600,
          }}
          initialValues={{
            
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Leaser id"
            name="id"
            hidden
            rules={[
              {
                required: true,
                message: "Please input Lesers Name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
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
            key={StartingDate}
            label="Lease Staring Data"
            name="SDate"
            rules={[
              {
                required: true,
                message: "Please input Starting Date!",
              },
            ]}
        //     getValueFromEvent={(e) => e?.format("YYYY-MM-DD")}
        //   getValueProps={(e) => ({
        //       value: e ? dayjs(e) : "",
        //   })}
          >
            <DatePicker
          
              placeholder="Select Starting Date"
              onChange={(date, dateString) => {setsDate(dateString);console.log(sdate);}}
              
              
              disabledDate={(current) => {
                return current && current < Date.now("YYYY-m-d");
              }}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            key={EndingDate}
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
              
              defaultValue={dayjs(EndingDate,"YYYY/MM/DD")} 
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
                  <Option value={leasedproperty?.id} >
                  {leasedproperty?.name}
                  </Option>
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
          >
            <InputNumber
              min={500}
              placeholder="Enter The Emailid"
              style={{ width: "100%" }}
            />
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
    
      </Card>
    </div>
  );
};

export default EditLeases;
