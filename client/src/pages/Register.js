import React, { useState, useEffect } from 'react';
import { Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Layouts/Spinner';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (values) => {
    try {
      setLoading(true);
      await axios.post(`${API_BASE_URL}/api/v1/users/register`, values);
      message.success('Registered Successfully');
      setLoading(false);
      navigate('/login');
    } catch (error) {
      setLoading(false);
      message.error('invalid username or password');
    }
  };

  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <>
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="register-page">
          {loading && <Spinner />}
          <Form layout="vertical" onFinish={submitHandler}>
            <h1>Register</h1>
            <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
              <Input type="password" />
            </Form.Item>
            <div className="d-flex justify-content-between">
              <Link to="/login">Already Registered? Click here to Login</Link>
              <button className="btn btn-primary">Register</button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Register;
