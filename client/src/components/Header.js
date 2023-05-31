import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import authService from '../service/authService';
import './header.css'
import { UserContext } from '../service/UserContext';
import UserStatus from './UserStatus';

/*

Header komponent, den som visas på varje sida.
Sköter hämtning av användardata, utloggning och visar vem som är inloggad
*/

function Header() {
  
  const navigate = useNavigate();
  const {user, setUser} = useContext(UserContext);

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
      <div className="wrapper">
      <i class="fa-solid fa-book-open"></i>
        <h1>Booksters</h1>
      </div>

        <UserStatus signOut={signOut}></UserStatus>
    </header>
  )
}

export default Header