import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>PayUp App</h1>
        <Router>
          <Routes>
          <Route exact path="/login" Component={LoginPage} />
          <Route path="/register" Component={RegisterPage} />
          </Routes>
        </Router>
      </header>

      <body className="App-body">
        <div>
          <h2>Welcome!</h2>
        </div>
      </body>
    </div>
  );
}

// seperate component for a button
function MyButton() {
  // with the component we can add another function that is referenced by the component
  function handleClick() {
    alert('You clicked me!');
  }

  return (
    // we reference the actual handleClick() here
    <button onClick={handleClick}>
      I'm a button
      </button>
  );
}

export default App;