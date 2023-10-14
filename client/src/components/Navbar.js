import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';

export default function Navigation() {
  const links = ['Home', 'Employees', 'Groups', 'Rooms', 'Schedules'];

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center"> {/* Add justify-content-center class here */}
          <Nav className="mr-auto">
            {links.map((link, index) => (
              <Nav.Link key={index} href={'#' + link.toLowerCase()} className="nav-a">
                {link}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
