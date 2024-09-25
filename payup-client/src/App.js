import React from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>PayUp App</h1>
      </header>

      <div className="App-body">
        <div>
          <h2>Welcome!</h2>
        </div>

        <RegisterPage />
      </div>
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