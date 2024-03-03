import { faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';


const Navigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [canPost, setCanPost] = useState(false);
  const location = useLocation();
  const [username, setUsername] = useState("")

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const superuser = localStorage.getItem('superuser');
    const uname = localStorage.getItem('username');

    setIsLoggedIn(!!token);
    setUsername(uname);

    if(role=='employer' || superuser=='true'){
      setCanPost(true);
     
    }
  }, [location.pathname]); // Trigger effect on route change

  return (
    <nav>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        {isLoggedIn ? (
          <>
            {canPost ? (
              <>
            <li>
              <Link to='/jobposting'>Post Job</Link>
            </li>
            <li>
              <Link to='/yourjobs'>Your Posted Jobs</Link>
            </li>
            </>) : (<></>)}
            

            <li>
              <Link to='/joblisting'>View Jobs</Link>
            </li>
            <li>
              <Link to='/logout'>Logout</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to='/login'>Login</Link>
            </li>
            <li>
              <Link to='/signup'>Signup</Link>
            </li>
          </>
        )}
      </ul>
      <li>
      
        <span>{username}</span>
        <FontAwesomeIcon icon={faUser} />
        
      </li>
    </nav>
  );
};

export default Navigation;
