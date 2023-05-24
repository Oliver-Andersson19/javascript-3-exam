import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import './header.css'

import { UserContext } from '../service/UserContext';

function Header() {


  const {user, setUser} = useContext(UserContext);
  const navigate = useNavigate();

  
  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
          'Authorization': 'Bearer '+ sessionStorage.getItem("JWT_TOKEN"), 
      }
    }

    async function fetchProfileData() {
      let result = await fetch("http://127.0.0.1:3000/library/profile", options);
      
      if(result.status === 200) {
        result = await result.json()
        setUser(result.user)
      } else {
        console.log("No valid JWT")
      }
    }

    
    fetchProfileData();
  }, [])

  function signOut() {
    sessionStorage.removeItem("JWT_TOKEN")
    setUser({})
    setTimeout(() => navigate("/login"), 1000);
  }
 
  return (
    <header>
        <h1>Booksters website</h1>

        
        <div className="user-status-container">
          {user !== undefined && user.role && <>
            <p>Browsing as {user.role.toLowerCase()} {user.username}</p>
            <button className='signout-btn' onClick={signOut}>Sign out</button>
          </>}
          {(user === undefined || user.role === undefined) && <>
            <p>Browsing as guest...</p>
            <button className='signout-btn'>Sign in</button>
          </>}

        </div>
    </header>
  )
}

export default Header