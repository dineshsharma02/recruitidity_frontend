import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';




const Login = () => {

    const navigate = useNavigate();
    
    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(token){
          navigate("/");
        }
        else{
          navigate('/login');
        }
      },[navigate])


    

    const [userData,setUserData] = useState({
        username:'',
        password:'',
    });

    const handleLogin = async() =>{
        try{
            const response = await axios.post("http://localhost:8000/user/login/",userData);
            const token = response.data.access
            localStorage.setItem('token',token);
            console.log(response.data);
            const response1 = await axios.get("http://localhost:8000/user/userinfo/",{
              headers:{
                'Content-type':'application/json',
                'Authorization': `Bearer ${token}`
              }
            });
            localStorage.setItem('role',response1.data.role);
            localStorage.setItem('username',response1.data.username);
            localStorage.setItem('superuser',response1.data.is_superuser);
            navigate("/");
        }
        catch(error){
            console.error(error);
            alert(JSON.stringify(error.response.data.detail))
        }
    }

    const handleChange = (e) =>{
        setUserData({...userData,[e.target.name]:e.target.value});
    }
  return (
    <div className='login-container'>
        <h2 className='login-header'>Login</h2>
        <span><FontAwesomeIcon icon="fa-solid fa-user" /></span>
        <form className='login-form'>
            <label>
                Username
                <br/>
                <input type = 'text' name='username' onChange={handleChange} required={true}/>
            </label>
            <br/><br/>
            <label>
                Password
                <br/>
                <input type = 'password' name='password' onChange={handleChange} required={true}/>
            </label>
            <br/><br/>
            <button type='button' onClick={handleLogin}>Login</button>
        </form>
    </div>
  )
}

export default Login