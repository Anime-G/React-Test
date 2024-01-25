import { Button, Card, Form, Input, message } from "antd";
import useSelection from "antd/es/table/hooks/useSelection";

import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { findTenants, updateTenant } from "../../Redux/Tenants/Actions";
import { removeExtraSpace } from "../trimData";

const EditTenants = () => {
    //dispatch
  const dispatch = useDispatch();
  //navigate
  const navigate = useNavigate();
  //useParams
  const params = useParams();
  //useSelector
  
  const msg = useSelector((state) => state?.tenants?.result?.msg);
  const tenantData = useSelector((state) => state?.tenants);
  const name = useSelector((state) => state?.tenants?.result?.name);
  const emailid = useSelector((state) => state?.tenants?.result?.emailid);
  const id = useSelector((state) => state?.tenants?.result?.id);
  //useForm
  const [formdata] = Form.useForm();
  //useState
  const [form, setform] = useState();
  
  //useEffect()
  useEffect(() => {
    findData();
  }, [dispatch]);
  useEffect(() => {

    formdata.setFieldsValue({ name, id, emailid });
    
  });
  const findData = () => {
    if (params.id) {
      const { id } = params;

      dispatch(findTenants(id));

      if (tenantData.err) {
        
        navigate("/Tenants");
      } else {
        setform(
          <>
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
                label="id"
                name="id"
                hidden
                rules={[
                  {
                    required: true,
                    message: "Please input your Name!",
                  },
                ]}
                normalize={(value, prevVal, prevVals) => value.trim()}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input your Name!",
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
                    message: "Please input your Email-id!",
                  },
                ]}
                normalize={(value, prevVal, prevVals) => value.trim()}
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
                  Update
                </Button>
              </Form.Item>
            </Form>
          </>
        );
      }
    }
  };
  //update the Tenant
  const onFinish = async(values) => {
    

    const id = values.id;
    const name = removeExtraSpace(values.name);
    const emailid = removeExtraSpace(values.emailid);
    values = {id,name,emailid};
    // console.log("Trimmed Uploaded!", values);
    dispatch(updateTenant(values));
   
    
        // console.log(tenantData);
      
      navigate("/Tenants");
        
    
    
    
  };

  return (
    <div>
      {}
      <Card
        title="Tenant's Information"
        style={{ width: "60%", margin: "20px auto" }}
      >
        {form}
      </Card>
    </div>
  );
};

export default EditTenants;
