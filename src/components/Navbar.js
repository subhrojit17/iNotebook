import React from "react";
import { Link, NavLink } from "react-router-dom";
const Navbar = () => {
  const aboutLinkStyles = ({ isActive }) => ({
    color: isActive ? "#fff" : "#bcbcbc", // illuminated (white) when active, dull (grey) when not
    textDecoration: "none",
    padding: "5px 12px",
    marginLeft: "8px",
  });
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand mx-3" to="/home">
          iNotebook
        </Link>
        <NavLink to="/about" style={aboutLinkStyles}>
          About
        </NavLink>
        <ul className="navbar-nav flex-row ms-auto">
          <li className="nav-item me-2">
            <Link className="btn btn-outline-light" to="/login">
              Login
            </Link>
          </li>
          <li className="nav-item me-2">
            <Link className="btn btn-primary" to="/signup">
              Signup
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
