import React from "react";
import pagenotfound from "../assets/page-not-found.png";
import styles from "../styles/PageNotFound.module.css";
import Asset from "./Asset";

const NotFound = () => {
  return (
    <div className={styles.notFound}>
      <Asset
        src={pagenotfound}
        message={`Sorry, the page you're looking for doesn't exist.`}
      />
    </div>
  );
};

export default NotFound;
