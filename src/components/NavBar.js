import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import logo from "../assets/logo.webp";

const NavBar = () => {
  return (
    <Navbar bg="dark" expand="lg">
      <Navbar.Brand href="#home">
        <img src={logo} alt="logo" height="50" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#create">Create</Nav.Link>
          <Nav.Link href="#search">Search</Nav.Link>
          <Nav.Link href="#sign out">Sign out</Nav.Link>
        </Nav>
        <Navbar.Text>
          Signed in as: <a href="#login">Sara Bojorge</a>
        </Navbar.Text>
      </Navbar.Collapse>      
    </Navbar>
  );
};

export default NavBar;
