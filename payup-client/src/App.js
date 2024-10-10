import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import TransferTypePage from "./pages/TransferTypePage";
import CreateTransferPage from "./pages/CreateTransferPage";
import CreateRequestPage from "./pages/CreateRequestPage";
import TransferDetaiPage from "./pages/TransferDetailsPage";
import AuthContext, { AuthProvider } from './store/AuthContext';
import { TransferProvider } from './store/TransferContext';


function App() {
  return (
    <AuthProvider>
      <TransferProvider>
        <Router>
          <div className="App">
            <Navigation /> {/* Move the navigation logic into a separate component */}
            <Routes>
              <Route path='/' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route path='/home/:userId' element={<HomePage />} />
              <Route path='/home/:userId/transfer' element={<TransferTypePage />} />
              <Route path='/home/:userId/transfer/pay' element={<CreateTransferPage />} />
              <Route path='/home/:userId/transfer/request' element={<CreateRequestPage />} />
              <Route path='/home/:userId/transfer/:transferId' element={<TransferDetaiPage />} />
            </Routes>
          </div>
        </Router>
      </TransferProvider>
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
            style={{ padding: '16px 0px 0px 16px' }}
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