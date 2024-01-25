import { Descriptions, Layout, List } from 'antd';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchProperty } from '../../Redux/Properties/Actions';
import { Content } from 'antd/es/layout/layout';

const ViewProperty = () => {
    const params = useParams();

    const property = useSelector((state) => state?.property);
    
    // const Tenants = useSelector((state) => state?.property?.result?.Tenant);
    const dispatch = useDispatch();
    useEffect(() => {
        const { id } = params;
        dispatch(fetchProperty(id));

    }, [dispatch])

    console.log("viewpage ", property);
    return (
        <div>
            <Layout style={{ margin: "50px", borderRadius: "20px" }}>
                <Content style={{ padding: '48px' }}>
                    <Descriptions title="Property Information">
                        <Descriptions.Item label="Property Name">{property?.data?.name}</Descriptions.Item>
                        <Descriptions.Item label="Address">{property?.data?.address}</Descriptions.Item>
                        <Descriptions.Item label="Total Available Rooms">{property?.data?.available_rooms}</Descriptions.Item>
                        <Descriptions.Item label="Tenants"><List
                            size="small"
                            bordered
                            dataSource={property?.Tenant}
                            renderItem={(item) => <List.Item><Link to={`/Tenants/`} >{item.name}</Link></List.Item>}
                        /></Descriptions.Item>
                        
                    </Descriptions>
                </Content>
            </Layout>
        </div>
    )
}

export default ViewProperty
