import React, { useState, useEffect } from 'react';
import { Modal, Select, Form, Input, message, Table,DatePicker } from "antd";
import Layout from '../components/Layouts/Layout';
import axios from 'axios';
import Spinner from '../components/Layouts/Spinner';
import moment from 'moment';
import Analytics from '../components/Layouts/Analytics';
import {UnorderedListOutlined,AreaChartOutlined} from '@ant-design/icons'
const {RangePicker}=DatePicker

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false); 
  const [allTransaction, setAllTransaction] = useState([]);
  const [filter,SetFilter]=useState('7')
  const [selectedDate,setSelectedDate]=useState([])
  const [type,setType]=useState('all')
  const [viewData,setViewData]=useState('table')
  
  useEffect(() => {
    getAllTransactions();
  }, [filter,selectedDate,type]);

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      render:(text)=><span>
      {moment(text).format('YYYY-MM-DD')}
      </span>
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Reference',
      dataIndex: 'reference',
      key: 'reference',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <button className="btn btn-danger">Delete</button>
      ),
    },
  ];

 
  const getAllTransactions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      setLoading(true);
      const res = await axios.post('http://localhost:8080/api/v1/transactions/get-transaction', { userid: user._id,filter,selectedDate,type });
      setLoading(false);
      setAllTransaction(res.data);  
      console.log(res.data);
    } catch (error) {
      setLoading(false);
      console.error(error);
      message.error('Fetch issue with Transaction');
    }
  };

  
  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));  
      setLoading(true);
      await axios.post('http://localhost:8080/api/v1/transactions/add-transaction', { ...values, userid: user._id });
      setLoading(false);
      message.success("Transaction added successfully");
      setShowModal(false);
      getAllTransactions();  
    } catch (error) {
      setLoading(false);
      message.error('Error in submitting form:', error.response?.data || error.message);
    }
  };

  return (
    <Layout>
      {loading && <Spinner />}
      <div className="filters">
        <div>
          <h6>Select Filter</h6>
          <Select value={filter} onChange={(values)=>SetFilter(values)}>
            <Select.Option value="7">Last 1 Week</Select.Option>
            <Select.Option value="30">Last 1 Month</Select.Option>
            <Select.Option value="365">Last 1 Year</Select.Option>
            <Select.Option value="custom">custom</Select.Option>
            </Select>
            {filter === 'custom' && (
  <RangePicker
    onChange={(values) => setSelectedDate(
      values ? [values[0].format('YYYY-MM-DD'), values[1].format('YYYY-MM-DD')] : []
    )}
    style={{ width: '100%' }}
  />
)}

        </div>
        <div>
          <h6>Select Type</h6>
          <Select value={type} onChange={(values)=>setType(values)}>
            <Select.Option value="all">All</Select.Option>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
            
            </Select>
            {filter === 'custom' && (
  <RangePicker
    onChange={(values) => setSelectedDate(
      values ? [values[0].format('YYYY-MM-DD'), values[1].format('YYYY-MM-DD')] : []
    )}
    style={{ width: '100%' }}
  />
)}

        </div>
        <div>
          
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>Add New</button>
        </div>
      </div>
      <div className="mx-2 d-flex justify-content-center align-items-center border-black 1px">
      <UnorderedListOutlined 
       className={`mx-2 ${viewData === 'table' ? 'active-icon' : 'inactive-icon'}`} 
       onClick={() => setViewData('table')}
       />
            <AreaChartOutlined   className={`mx-2 ${viewData === 'analytics' ? 'active-icon' : 'inactive-icon'}`} 
       onClick={() => setViewData('analytics')}
       />
          </div>
      <div className="content">
        {viewData === 'table' ? 
        <Table columns={columns} dataSource={allTransaction}/>:<Analytics allTransaction={allTransaction}/>
        }
        
      </div>
      <Modal title="Add transaction" open={showModal} onCancel={() => setShowModal(false)} footer={false}>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Amount" name="amount">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Type" name="type">
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Select>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="tip">Incentive</Select.Option>
              <Select.Option value="project">Project</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="rent">Rent</Select.Option>
              <Select.Option value="travel">Travel</Select.Option>
              <Select.Option value="groceries">Groceries</Select.Option>
              <Select.Option value="Electricity">Electricity and wifi</Select.Option>
              <Select.Option value="Medical">Medical</Select.Option>
              <Select.Option value="tax">Tax</Select.Option>
              <Select.Option value="fee">Fee</Select.Option>
              <Select.Option value="shopping">Shopping</Select.Option>
              <Select.Option value="Entertainment">Entertainment</Select.Option>
              <Select.Option value="other">Other</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Date" name="date">
            <Input type="date" />
          </Form.Item>
          <Form.Item label="Reference" name="reference">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input type="text" />
          </Form.Item>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">Save</button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default HomePage;
