import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";


function App() {
  return (
    <Router>
      <div className="App">
        <div className="nav">
          <h1>PayUp App</h1>
          <Link to='/'>Home</Link>
          <span>
            &nbsp;|&nbsp;
            <Link to='/register'>Register</Link>
          </span>
        </div>

        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;