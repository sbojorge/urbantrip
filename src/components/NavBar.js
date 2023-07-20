import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import styles from "../styles/NavBar.module.css";
import { useLocation, NavLink } from "react-router-dom";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  const loggedInIcons = (
    <>
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
      <NavLink
        className={styles.link}
        to={`/profiles/${currentUser?.profile_id}`}
      >
        Signed in as: {currentUser?.username}
        <Avatar src={currentUser?.profile_image} height={40} />
      </NavLink>
    </>
  );

  const loggedOutIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signin"
      >
        <i className="fas fa-sign-in-alt"></i>Sign in
      </NavLink>
      <NavLink
        to="/signup"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <i className="fas fa-user-plus"></i>Sign up
      </NavLink>
    </>
  );

  const location = useLocation(); // Use here to hide the nav bar in the authentication pages
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
              <Navbar.Brand className={styles.logo}>UrbanTrip</Navbar.Brand>
            </NavLink>            
            <Navbar.Toggle
              ref={ref}
              onClick={() => setExpanded(!expanded)}
              aria-controls="basic-navbar-nav"
              className={styles.burger}
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

                {currentUser ? loggedInIcons : loggedOutIcons}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
      ;
    </>
  );
};

export default NavBar;
