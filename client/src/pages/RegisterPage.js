import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import authService from '../service/authService';
import Header from '../components/Header';
import './registerPage.css'

/*
Routen /register, sköter registrering
*/

function RegisterPage() {

  const [loginResultText, setLoginResultText] = useState("");
  const [credentials, setCredentials] = useState({
        username: "",
        password: ""
  })
    
  const handleSubmit = async (e) => {
    const result = await authService.handleRegister(e, credentials);
    setLoginResultText(result.error || result.message)
  }

  return (
    <>
    <Header></Header>
    <section className='register-section'>
      <form className="register-form">
          <h1>Register</h1>

          <div>
            <p>Username</p>
            <input type="text" name="username-field" className="username-field" autoComplete="off" onChange={(e) => setCredentials({...credentials, username: e.target.value})}/>
          </div>

          <div>
            <p>Password</p>
            <input type="password" name="password-field" className="password-field" onChange={(e) => setCredentials({...credentials, password: e.target.value})}/>
          </div>
          {loginResultText && <p className="login-result-text">{loginResultText}</p>}

          <p>Already have an account? Sign in <Link to="/login" className='register-link'>here!</Link></p>

          <button onClick={handleSubmit} className="login-btn">Register new account</button>
          <Link to="/books" className='register-btn' data-testid="guest-login">Proceed as guest user</Link>
      </form>
    </section>
    </>
  )
}

export default RegisterPage