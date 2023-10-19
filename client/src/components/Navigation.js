import React, { useState } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import Auth from '../utils/auth';
import { Link } from 'react-router-dom';

export default function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogout = () => {
    Auth.logout();
    setIsLoggedIn(false);
  };

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
          <Nav className="mr-auto">
            <Link to='/home' className="nav-link">
              Home
            </Link>
            <Link to='/rooms' className="nav-link">
              Rooms
            </Link>
          </Nav>
          {isLoggedIn ? (
            <Nav>
              <Nav.Link onClick={handleLogout} className="nav-a">
                Logout
              </Nav.Link>
            </Nav>
          ) : null}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
