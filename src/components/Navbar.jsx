import React from "react";
import "./Navbar.css";

const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="logo">CrewSync</div>
      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        {user ? (
          <>
            <li><a href="#dashboard">Dashboard</a></li>
            <li>
              <button className="logout-btn" onClick={onLogout}>
                Logout ({user.name})
              </button>
            </li>
          </>
        ) : (
          <li>
            <a
              href="#login"
              onClick={(e) => {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent('showLogin'));
              }}
            >
              Login
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
