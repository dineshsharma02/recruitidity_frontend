import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Signup = () => {

    const navigate = useNavigate();
    
    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(token){
          navigate("/");
        }
        else{
          navigate('/signup');
        }
      },[navigate])

    const [userData,setUserData] = useState({
        username:'',
        email:'',
        password:'',
        role:'candidate',
    });

    const handleSignUp = async() =>{
        try{
            const response = await axios.post('http://localhost:8000/user/signup/',userData);
            
            alert(response.data.status)
            
            navigate("/login");

        }
        catch(error){
            const error_string = JSON.stringify(error.response.data)
            

            alert(error_string)

            
        }
    }

    const handleChange = (e) =>{
        setUserData({...userData,[e.target.name]:e.target.value});
    };

    return (
        <div className='login-container'>
            <h2>Sign Up</h2>
            <form className='login-form'>
                <label>
                    Username
                    <input type='text' name='username' onChange={handleChange}/>
                </label>
                <br/>
                <label>
                    Email
                    <input type='email' name='email' onChange={handleChange}/>
                </label>
                <br/>
                <label>
                    Password
                    <input type='password' name='password' onChange={handleChange}/>
                </label>
                <br/>

                <label>
                    Role
                    <select
                    value={userData.role}
                    onChange={(e) => setUserData({ ...userData, role: e.target.value })}
                    >
                    <option value="candidate">Candidate</option>
                    <option value="employer">Employer</option>
                    </select>
                </label>
                <br/>
                <button type='button' onClick={handleSignUp}>Signup</button>
            </form>
        </div>
    );
};

export default Signup