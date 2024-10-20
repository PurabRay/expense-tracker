import React,{useState,useEffect} from 'react'
import {Form,Input,message} from 'antd'
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios'

import Spinner from '../components/Layouts/Spinner';
const Register = () => {
  const [loading, setLoading] = useState(false);
  const Navigate=useNavigate();

    const submitHandler=async(values)=>{
        try{
          console.log("registering");
          setLoading(true)
         await axios.post('http://localhost:8080/api/v1/users/register',values);
         message.success('Registered Successfully');
         setLoading(false);
         Navigate('/login');
        }catch(error){
          setLoading(false);
          console.error('Error during registration:', error.response?.data || error.message);
         message.error('invalid username or password')
        }
    }
    useEffect(()=>{
      if(localStorage.getItem('user')){
        Navigate('/');
    }
  },[Navigate])
  return (
    <>
     <div className="d-flex align-items-center justify-content-center vh-100">
      
        <div className="register-page">
          {loading && <Spinner/>}
      <Form layout="vertical" onFinish={submitHandler}>
        <h1>Register</h1>
        <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
    <Input />
  </Form.Item>

  <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input a valid email!', type: 'email' }]}>
    <Input type="email" />
  </Form.Item>

  <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
    <Input type="password" />
  </Form.Item>
        <div className="d-flex justify-content-between">
            <Link to = "/login">Already Registered? Click here to Login</Link>
            <button classsName="btn btn-primary">Register</button>
        </div>
      </Form>
      </div>
        

    </div>
    </>
  )
}

export default Register
