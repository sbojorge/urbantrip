import React from "react";
import styles from "../../styles/Post.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { Dropdown } from "../../components/Dropdown";

const Post = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    comments_count,
    title,
    content,
    image,
    video,
    updated_on,
    postPage,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  return (
    <Card className={styles.Post}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link className={styles.postlinks} to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} /> {owner}
          </Link >
          <div className="d-flex align-items-center">
            <span>
              {updated_on}
              {is_owner && postPage && <Dropdown />}
            </span>
          </div>
        </Media>
      </Card.Body>
      <div>
        {!image?.includes("old-time-camera.512x422_iwlbmx") ? (
          <Link to={`/posts/${id}`}>
            <Card.Img src={image} alt={title} />
          </Link>
        ) : (
          <Link to={`/posts/${id}`}>
            <video src={video} width={400} height={400} controls />
          </Link>
        )}
      </div>
      <Card.Body>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {content && <Card.Text>{content}</Card.Text>}
      </Card.Body>
      <div className={styles.PostBar}>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>Log in to like posts</Tooltip>}
        >
          <i className={`${styles.posticons} far fa-heart`} />
        </OverlayTrigger>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>Log in to add a comment</Tooltip>}
        >
          <i className={`${styles.posticons} far fa-comments`} />
        </OverlayTrigger>
        {comments_count}
      </div>
    </Card>
  );
};

export default Post;
