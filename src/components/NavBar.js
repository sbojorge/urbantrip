import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from "../assets/logo.webp";
import home from "../assets/navbar/home.webp";
import signout from "../assets/navbar/logout.webp";
import search from "../assets/navbar/search.webp";
import create from "../assets/navbar/plus-circle.webp";
import styles from "../styles/NavBar.module.css";

const NavBar = () => {
  return (
    <Navbar className={styles.NavBar} expand="md" fixed="top">
      <Container>
        <Navbar.Brand>
          <img src={logo} alt="UrbanTrip_logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link className={styles.link}>
              <img src={home} alt="home" className={styles.NavIcon} />Home</Nav.Link>
            <Nav.Link className={styles.link}>
              <img src={create} alt="create_post" className={styles.NavIcon} />Create</Nav.Link>
            <Nav.Link className={styles.link}>
              <img src={search} alt="search_post" className={styles.NavIcon} />Search</Nav.Link>
            <Nav.Link className={styles.link}>
              <img src={signout} alt="signout" className={styles.NavIcon} />Sign out</Nav.Link>
          </Nav>
          <Navbar.Text className={styles.link}>
            Signed in as: <a href="#login">Sara Bojorge</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
