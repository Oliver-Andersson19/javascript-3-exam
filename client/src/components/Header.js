import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import authService from '../service/authService';
import './header.css'

import { UserContext } from '../service/UserContext';

function Header() {


  const {user, setUser} = useContext(UserContext);
  const navigate = useNavigate();


  useEffect( () => {
    
    async function fetchProfileData() {
      const result = await authService.fetchProfileData(); 
      setUser(result)
    }

    fetchProfileData()
  }, [])

  function signOut() {
    sessionStorage.removeItem("JWT_TOKEN")
    setUser({})
    navigate("/login");
  }
 
  return (
    <header className='page-header'>
        <h1>Booksters website</h1>

        <div className="user-status-container">
          {user !== undefined && user.role && <>
            <p>Browsing as {user.role.toLowerCase()} {user.username}</p>
            <button className='sign-btn' onClick={signOut}>Sign out</button>
          </>}
          {(user === undefined || user.role === undefined) && <>
            <p>Browsing as guest...</p>
            <Link to="/login" className='sign-btn'>Sign in</Link>
          </>}

        </div>
    </header>
  )
}

export default Header