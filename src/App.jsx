import React, { useState } from "react";
import Navbar from "./components/Navbar";
import AuthForm from "./components/AuthForm";
import Dashboard from "./components/Dashboard";
import ThemeToggle from "./components/ThemeToggle";
import "./App.css";

function App() {
  const [user, setUser] = useState(null); // null or { name, role }

  // Called on successful login/signup
  const handleLogin = (userData) => {
    setUser(userData);
  };

  // Called on logout
  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="app-wrapper">
      <Navbar user={user} onLogout={handleLogout} />

      <ThemeToggle />

      <main className="main-content">
        {!user ? (
          <AuthForm onLogin={handleLogin} />
        ) : (
          <Dashboard role={user.role} />
        )}
      </main>

      <footer>
        <p>© 2025 CrewSync Inc.</p>
      </footer>
    </div>
  );
}

export default App;
