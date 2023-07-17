import React from "react";
import { Navbar, Nav, Container, Image } from "react-bootstrap";
// import logo from "../assets/logo.webp";
import styles from "../styles/NavBar.module.css";

const NavBar = () => {
  return (
    <Navbar bg="light" className={styles.NavBar} expand="md" fixed="top">
      <Container>
        <Navbar.Brand className={styles.logo}>
          {/* <img src={logo} alt="UrbanTrip_logo" /> */}UrbanTrip
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link className={styles.link}>
              <Image src={"https://res.cloudinary.com/dvvr7cpfs/image/upload/v1689578981/home-button-icon_bogip3.webp"} className={styles.NavIcon} />Home</Nav.Link>
            <Nav.Link className={styles.link}>
              <Image src={"https://res.cloudinary.com/dvvr7cpfs/image/upload/v1689578980/plus-circle.256x256_kpllx5.webp"} className={styles.NavIcon} />Create</Nav.Link>
            <Nav.Link className={styles.link}>
              <Image src={"https://res.cloudinary.com/dvvr7cpfs/image/upload/v1689578980/search.256x250_vfghof.webp"} className={styles.NavIcon} />Search</Nav.Link>
            <Nav.Link className={styles.link}>
              <Image src={"https://res.cloudinary.com/dvvr7cpfs/image/upload/v1689578981/logout-icon_gvsj1w.webp"} className={styles.NavIcon} />Sign out</Nav.Link>
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
