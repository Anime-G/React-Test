import { Button, Table ,Input,Space, Popconfirm, message} from "antd";
import React, { useEffect,useRef, useState } from "react";
import {DeleteOutlined,SearchOutlined, EditOutlined, QuestionCircleOutlined} from '@ant-design/icons'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {  deleteLease, fetchLeases } from "../../Redux/Leases/Actions";
import Highlighter from 'react-highlight-words';
import _ from "lodash";

const LeaseHome = () => {
    const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const Leases = useSelector((state) => state?.leases?.Data);
  // const Tenant = useSelector((state) => state?.leases);
  // const err = useSelector((state) => state?.leases?.result?.err);
  // const msg = useSelector((state) => state?.leases?.result?.msg);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLeases());
  }, [dispatch]);
  // console.log("tenantHome: ", Leases);
  console.log("Tenats id:",_.map(Leases, 'id'));
  //FILTER TABLE
  
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  }); 
  const DeleteConfirm = (id) => {
    
    dispatch(deleteLease(id));
    
    
  };
  const columns = [
    {
      title: "Index",
      dataIndex: "id",
      key: "id",
      width:"100px",
      sorter: (a, b) => a.id - b.id,
      render: (id, record, index) => {
        ++index;
        return index;
      },
      
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps('name'),
    },
    {
      title: "Email",
      dataIndex: "emailid",
      key: "age",
      ...getColumnSearchProps('emailid'),
    },

    {
      title: "Starting Date",
      dataIndex: "StartingDate",
      key: "StartingDate",
      ...getColumnSearchProps('StartingDate'),
    },

    {
      title: "Ending Date",
      dataIndex: "EndingDate",
      key: "EndingDate",
      ...getColumnSearchProps('EndingDate'),
    },
    {
      title: "Update",
      dataIndex: "id",
      key: "upid",
      width:"50px",
      render: (text, record) => <Link to={'Edit/' + record.id}><EditOutlined style={{fontSize:"30px"}}/></Link>,
    },
    {
      title: "Delete",
      dataIndex: "id",
      key: "delid",
      width:"50px",
      render: (text,record) => <Popconfirm
      title={"Delete  "+record.name}
      description={"Are you sure to delete this Lease?"}
      onConfirm={()=>DeleteConfirm(record.id)}
      icon={
        <QuestionCircleOutlined
          style={{
            color: 'red',
          }}
        />
      }
    ><DeleteOutlined   style={{color:"red",fontSize:"30px"}}/></Popconfirm>

    },
    
  ];
  return (
    <div style={{ padding: "20px" }}>
      <h1 align="center">Leases</h1>
      <h1 align="right">
        <Link to="/addLease">
          <Button type="primary">Add Leases</Button>
        </Link>
      </h1>

      <Table dataSource={Leases} rowKey="id" columns={columns} />
    </div>
  )
}

export default LeaseHome
