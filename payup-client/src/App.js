import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import AuthContext, { AuthProvider } from './store/AuthContext';


function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navigation /> {/* Move the navigation logic into a separate component */}
          <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/home/:userId' element={<HomePage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

function Navigation() {
  const { authState, logout } = useContext(AuthContext); // Now useContext works here
  const navigate = useNavigate(); // useNavigate works correctly here

  return (
    <div className="nav">

      {authState.token ? (
        <>
          <Link
            to='#'
            onClick={(e) => {
              e.preventDefault();
              logout(navigate);
            }}
          >
            Logout
          </Link>
        </>
      ) : (
        <>
          <Link to='/register'>Register</Link>
          &nbsp;|&nbsp;
          <Link to='/'>Login</Link>
        </>
      )}
    </div>
  );
}

export default App;