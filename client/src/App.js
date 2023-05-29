import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Books from "./pages/Books";
import authService from "./service/authService";
import { UserContext } from "./service/UserContext";

/*
  App.js, sätter alla routes och skapar ett Context som är till för användardata.
  Användardatan sätts i headern.
*/


function App() {

  const [user, setUser] = useState("")
  const value = { user, setUser }

  return (
    <div className="page-wrapper">
      <BrowserRouter>
        <UserContext.Provider value={value}>
          <Routes>
            <Route path='/' element={<Navigate replace to="login"></Navigate>}/>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />}/>
            <Route path="books" element={<Books />}/>
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
