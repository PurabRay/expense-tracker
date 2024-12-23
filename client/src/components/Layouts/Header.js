import React from 'react'
import { Link } from 'react-router-dom'
import {useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

const Header = () => {
  const navigate=useNavigate()
  const [loginUser,setLoginUser]=useState('')
  useEffect(() => {
    const user=JSON.parse(localStorage.getItem('user'))
    if(user){
      setLoginUser(user)
    }
  },[])
  const logoutHandler=()=>{
    localStorage.removeItem('user');
    
    navigate('/login')
    
  }
  return (
   
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
      <Link className="navbar-brand" to="/">expense management</Link>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
       
        <li className="nav-item">
          <li className="nav-link active"  ><p>{loginUser && loginUser.name}</p></li>
        </li>
        <button to="/user" className="btn btn-primary" onClick={logoutHandler}>Logout</button>
      </ul>
    </div>
  </div>
</nav>


  )
}

export default Header
