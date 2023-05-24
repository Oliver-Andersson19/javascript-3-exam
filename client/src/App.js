import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Books from "./pages/Books";

import { UserContext } from "./service/UserContext";

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
