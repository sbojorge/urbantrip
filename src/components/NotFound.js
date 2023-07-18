import React from "react";
import styles from "../styles/PageNotFound.module.css";
import { Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container className="text-center pt-4">
      <Image
        src="https://res.cloudinary.com/dvvr7cpfs/image/upload/v1689713680/page-not-found.218x256_nqko1h.webp"
        className={styles.notfound}
      />

      <p className="pt-1">Sorry, page not found!</p>
      <Link to="/">Click here to go back Home</Link>
    </Container>
  );
};

export default NotFound;
