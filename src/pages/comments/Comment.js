import React from "react";
import styles from "../../styles/Comment.module.css";
import { Media } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom";
import Avatar from "../../components/Avatar";

const Comment = (props) => {
  const { profile_id, profile_image, owner, updated_on, content } = props;

  return (
    <div>
      <hr />
      <Media>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>
        <Media.Body className="align-self-center ml-2">
          <span className={styles.Owner}>{owner}</span>
          <span className={styles.Date}>{updated_on}</span>
          <p>{content}</p>
        </Media.Body>
      </Media>
    </div>
  );
};

export default Comment;
