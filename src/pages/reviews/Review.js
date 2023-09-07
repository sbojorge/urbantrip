import React from "react";
import Media from "react-bootstrap/Media";
import { Link } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import Avatar from "../../components/Avatar";
import styles from "../../styles/Comment.module.css";

const Review = (props) => {
  const { profile_id, profile_image, owner, updated_at, content, average_rating } =
    props;

  return (
    <>
      <hr />
      <Media>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>
        <Media.Body className="align-self-center ml-2">
          <span className={styles.Owner}>{owner}</span>
          <span className={styles.Date}>{updated_at}</span>
          <p>
            Rating:
            <Rating
              readonly
              initialValue={average_rating}
              size={40}
              fillColor="#6A62F8"
            />
          </p>
          <p>
            Review:
            {content}
          </p>
        </Media.Body>
      </Media>
    </>
  );
};

export default Review;
