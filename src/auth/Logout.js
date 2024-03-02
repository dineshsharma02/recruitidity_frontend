import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Logout = () => {


  const navigate = useNavigate();
    
  useEffect(()=>{
      const token = localStorage.getItem('token');
      if(!token){
        navigate("/login");
      }
      else{
        navigate('/logout');
      }
    },[navigate])


    const handleLogout = () =>{
        localStorage.clear();
        navigate('/login')

    };






  return (
    <div className='login-container'>
      <div className='login-form'>
        <h2>Logout</h2>
        <button type='button' onClick={handleLogout}>Logout!!</button>
    </div>

    </div>
  )
}

export default Logout