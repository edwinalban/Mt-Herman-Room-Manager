import React, { useState } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import Auth from '../utils/auth';
import { Link } from 'react-router-dom';

export default function Navigation() {
  const links = ['Home', 'Rooms'];
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
            {links.map((link, index) => (
              
                <Link to= {`${link.toLowerCase()}` } className="nav-a" key={index}>
                {link}
                </Link>
            
            ))}
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
