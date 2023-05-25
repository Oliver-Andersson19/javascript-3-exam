import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import authService from '../service/authService';
import Header from '../components/Header';
import './loginPage.css'

function LoginPage() {
  
  const navigate = useNavigate();
  const [loginResultText, setLoginResultText] = useState("");
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  })

  const handleSubmit = async (e) => {
      const result = await authService.handleLogin(e, credentials);
      if(result === true) {
          setTimeout(() => navigate("/books"), 1000);
          setLoginResultText("Successfully logged in")
      } else {
          setLoginResultText(result)
      }
          
  }

  return (
    <>
    <Header></Header>
    <section className='login-section'>
      <form className="login-form">
          <h1>Login</h1>
          <div>
            <p>Username</p>
            <input type="text" name="username-field" className="username-field" autoComplete="off" onChange={(e) => setCredentials({...credentials, username: e.target.value})}/>
          </div>

          <div>
            <p>Password</p>
            <input type="password" name="password-field" className="password-field" onChange={(e) => setCredentials({...credentials, password: e.target.value})}/>
          </div>
          
          {loginResultText && <p className="login-result-text">{loginResultText}</p>}

          <p>No account? Sign up <Link to="/register" className='register-link'>here!</Link></p>

          <button onClick={handleSubmit} className="login-btn">Login</button>
          <Link to="/books" className='register-btn' data-testid="guest-login">Proceed as guest user</Link>
      </form>
    </section>
    </>
  )
}

export default LoginPage