import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import AuthContext, { AuthProvider } from './store/AuthContext';


function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <div className="nav">
            <h1>PayUp App</h1>
            <Link to='/'>Home</Link>
            <span>&nbsp;|&nbsp;</span>
            <AuthContext.Consumer>
              {({authState, logout}) => {
                authState.token ? (
                  <>
                    <Link to='/home'>Home</Link>
                    &nbsp;|&nbsp;
                    <button onClick={logout}>Logout</button>
                  </>
                ) : (
                  <>
                    <Link to='/register'>Register</Link>
                    &nbsp;|&nbsp;
                    <button onClick={logout}>Login</button>
                  </>
                )
              }}    
            </AuthContext.Consumer>
          </div>

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

export default App;