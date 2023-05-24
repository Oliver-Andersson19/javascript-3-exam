import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Books from "./pages/Books";

function App() {
  return (
    <div className="page-wrapper">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate replace to="login"></Navigate>}/>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />}/>
          <Route path="books" element={<Books />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
