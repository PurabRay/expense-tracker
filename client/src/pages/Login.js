import React,{useState,useEffect} from 'react'
import {Form,Input,message} from 'antd'
import {Link,useNavigate} from 'react-router-dom'

import axios from 'axios'
import { set } from 'mongoose'
import Spinner from '../components/Layouts/Spinner'
const Login = () => {
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);
  const submitHandler=async(values)=>{
      try{
        setLoading(true)
       const {data} =await axios.post('/api/v1/users/login',values);
       setLoading(false);
       message.success('Logged in Successfully');
       localStorage.setItem('user',JSON.stringify({...data.user,password:'-'}));
       navigate('/')
      }catch(error){
        setLoading(false)
       message.error('something went wrong')
      }
  }
  useEffect(()=>{
    if(localStorage.getItem('user')){
      navigate('/');
  }
},[navigate])
  return (
    <>
      <div className="d-flex align-items-center justify-content-center vh-100">
      
      <div className="register-page">
        {loading && <Spinner/>}
    <Form layout="vertical" onFinish={submitHandler}>
      <h1>Login Form</h1>
      
      <Form.Item label="Email" name="email">
        <Input type="email"/>
      </Form.Item>
      <Form.Item label="Password" name="password">
        <Input type="password"/>
      </Form.Item>
      <div className="d-flex justify-content-between">
          <Link to = "/register">Not Registered Yet? Click here to Register</Link>
          <button className="btn btn-primary">Login</button>
      </div>
    </Form>
    </div>
      

  </div>
    </>
  )
}

export default Login
