import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../Components/images/user-profile-icon-free-vector.jpg";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'react-bootstrap';
import "../Components/style.css";

function Navbar(){
  return (
    <nav className="navbar navbar-expand-lg navbar-light p-3 mb-2 bg-info text-white">
      <Link className="navbar-brand" to="/">
        AeroLine
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/Plans">
              Plans
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/support">
              Support
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/Login">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/family">
              Family
            </Link>
          </li>
          <li className="nav-item">
            <Dropdown class="dropdown">
              <DropdownToggle variant="secondary" id="dropdown-basic">
                <img src={logo} style={{ width: '30px', height: '30px', margin: '6px', borderRadius:'50%' }}/>
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem href="#">Logout</DropdownItem>
                <DropdownItem href="#">Setting</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;