import React, { useEffect, useRef, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
// import logo from "../assets/logo.webp";
import styles from "../styles/NavBar.module.css";
import { useLocation, NavLink } from "react-router-dom";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const loggedInUser = <>{currentUser?.username}</>;
  const location = useLocation(); // Use here to hide the nav bar in the authentication pages

  const setCurrentUser = useSetCurrentUser();

  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setExpanded(false);
      }
    };

    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [ref]);

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {location.pathname !== "/signup" && location.pathname !== "/signin" && (
        <Navbar
          expanded={expanded}
          className={styles.NavBar}
          expand="md"
          fixed="top"
        >
          <Container>
            <NavLink to="/">
              <Navbar.Brand className={styles.logo}>
                {/* <img src={logo} alt="UrbanTrip_logo" /> */}UrbanTrip
              </Navbar.Brand>
            </NavLink>
            <Navbar.Toggle
              ref={ref}
              onClick={() => setExpanded(!expanded)}
              aria-controls="basic-navbar-nav"
            />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <NavLink
                  exact
                  className={styles.link}
                  activeClassName={styles.Active}
                  to="/"
                >
                  <i class="fa-sharp fa-solid fa-house"></i>
                  Home
                </NavLink>
                <NavLink
                  className={styles.link}
                  activeClassName={styles.Active}
                  to="/posts/create"
                >
                  <i class="fa-solid fa-camera-retro"></i>
                  Create
                </NavLink>
                <NavLink
                  className={styles.link}
                  activeClassName={styles.Active}
                  to="/likes"
                >
                  <i class="fa-sharp fa-solid fa-heart"></i>
                  Like
                </NavLink>
                <NavLink
                  className={styles.Navlink}
                  activeClassName={styles.Active}
                  to="/search"
                >
                  <i class="fa-solid fa-magnifying-glass"></i>
                  Search
                </NavLink>
                <NavLink className={styles.link} to="/" onClick={handleSignOut}>
                  <i class="fa-solid fa-person-walking-luggage"></i>
                  Sign out
                </NavLink>
              </Nav>
              <Navbar.Text className={styles.link}>
                Signed in as: {currentUser ? loggedInUser : ""}
                <Avatar src={currentUser?.profile_image} height={40} />
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
