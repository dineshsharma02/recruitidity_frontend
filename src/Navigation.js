import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [canPost, setCanPost] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const superuser = localStorage.getItem('superuser');

    setIsLoggedIn(!!token);

    if(role=='employer' || superuser=='true'){
      setCanPost(true);
      console.log(canPost);
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
            <li>
              <Link to='/jobposting'>Post Job</Link>
            </li>) : (<></>)}
            

            <li>
              <Link to='/joblisting'>View Job</Link>
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
    </nav>
  );
};

export default Navigation;
