import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Logo from "../assets/Logo.webp";
import styles from "../styles/NavBar.module.css";
import { useLocation, NavLink } from "react-router-dom";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import { removeTokenTimestamp } from "../utils/utils";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
    } catch (err) {
      // console.log(err);
    }
  };

  const loggedInIcons = (
    <>
      <NavLink
        className={styles.Links}
        activeClassName={styles.Active}
        to="/posts/create"
      >
        <i className={`${styles.icons} fa-solid fa-photo-film`}></i>
        Create
      </NavLink>
      <NavLink
        className={styles.Links}
        activeClassName={styles.Active}
        to="/feed"
      >
        <i className={`${styles.icons} fa-solid fa-users-line`}></i>
        Feed
      </NavLink>

      <NavLink
        className={styles.Links}
        activeClassName={styles.Active}
        to="/likes"
      >
        <i className={`${styles.icons} fa-sharp fa-solid fa-heart`}></i>
        Liked
      </NavLink>
      <NavLink
        className={styles.Links}
        activeClassName={styles.Active}
        to="/contact/create"
      >
        <i className={`${styles.icons} fa-solid fa-address-card`}></i>
        Contact
      </NavLink>
      <NavLink
        className={`${styles.Links} mr-5`}
        to="/"
        onClick={handleSignOut}
      >
        <i className={`${styles.icons} fa-solid fa-person-walking-luggage`}></i>
        Sign out
      </NavLink>
      <NavLink
        className={`${styles.Links} ml-5 pl-5`}
        to={`/profiles/${currentUser?.profile_id}`}
      >
        signed in as: {currentUser?.username}
        <Avatar src={currentUser?.profile_image} height={40} />
      </NavLink>
    </>
  );

  const loggedOutIcons = (
    <>
      <NavLink to="/signin" className={styles.Links}>
        <i
          className={`${styles.icons} fa-solid fa-person-walking-arrow-right`}
        ></i>
        Sign in
      </NavLink>
      <NavLink to="/signup" className={styles.Links}>
        <i className={`${styles.icons} fa-solid fa-person-circle-plus`}></i>Sign
        up
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
          expand="lg"
          fixed="top"
        >
          <NavLink to="/" className={styles.Links}>
            <Navbar.Brand className={styles.logo}>
              <img src={Logo} alt="logo" height="75" />
            </Navbar.Brand>
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
                className={styles.Links}
                activeClassName={styles.Active}
                to="/"
              >
                <i className={`${styles.icons} fa-sharp fa-solid fa-house`}></i>
                Home
              </NavLink>

              {currentUser ? loggedInIcons : loggedOutIcons}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      )}
      ;
    </>
  );
};

export default NavBar;
