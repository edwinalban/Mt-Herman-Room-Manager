import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';

export default function Navbar() {
  const links = ['Home', 'Employees', 'Groups', 'Rooms', 'Schedules'];

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {links.map((link, index) => (
            <Nav.Link key={index} href={'#' + link.toLowerCase()} className="nav-a">
              {link}
            </Nav.Link>
          ))}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
