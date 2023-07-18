import React, { useContext } from "react";
import { Navbar, Nav, Container, Image } from "react-bootstrap";
// import logo from "../assets/logo.webp";
import styles from "../styles/NavBar.module.css";
import { CurrentUserContext } from "../App";
import { useLocation, NavLink } from "react-router-dom";

const NavBar = () => {
  const currentUser = useContext(CurrentUserContext);
  const loggedInUser = <>{currentUser?.username}</>;
  const location = useLocation(); // Use here to hide the nav bar in the authentication pages

  return (
    <>
      {location.pathname !== "/signup" && location.pathname !== "/signin" && (
        <Navbar className={styles.NavBar} expand="md" fixed="top">
          <Container>
            <NavLink to="/">
              <Navbar.Brand className={styles.logo}>
                {/* <img src={logo} alt="UrbanTrip_logo" /> */}UrbanTrip
              </Navbar.Brand>
            </NavLink>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <NavLink
                  exact
                  className={styles.link}
                  activeClassName={styles.Active}
                  to="/"
                >
                  <Image
                    src={
                      "https://res.cloudinary.com/dvvr7cpfs/image/upload/v1689578981/home-button-icon_bogip3.webp"
                    }
                    className={styles.NavIcon}
                  />
                  Home
                </NavLink>
                <NavLink className={styles.link} to="#">
                  <Image
                    src={
                      "https://res.cloudinary.com/dvvr7cpfs/image/upload/v1689578980/plus-circle.256x256_kpllx5.webp"
                    }
                    className={styles.NavIcon}
                  />
                  Create
                </NavLink>
                <NavLink className={styles.Navlink} to="#">
                  <Image
                    src={
                      "https://res.cloudinary.com/dvvr7cpfs/image/upload/v1689578980/search.256x250_vfghof.webp"
                    }
                    className={styles.NavIcon}
                  />
                  Search
                </NavLink>
                <NavLink className={styles.link} to="#">
                  <Image
                    src={
                      "https://res.cloudinary.com/dvvr7cpfs/image/upload/v1689578981/logout-icon_gvsj1w.webp"
                    }
                    className={styles.NavIcon}
                  />
                  Sign out
                </NavLink>
              </Nav>
              <Navbar.Text className={styles.link}>
                Signed in as: {currentUser ? loggedInUser : ""}
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
      ;
    </>
  );
};

export default NavBar;
