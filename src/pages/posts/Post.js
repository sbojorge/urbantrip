import React from "react";
import styles from "../../styles/Post.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom";
import Avatar from "../../components/Avatar";

const Post = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
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
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} /> {owner}
          </Link>
          <div className="d-flex align-items-center">
            <span>
              {updated_on}
              {is_owner && postPage && "..."}
            </span>
          </div>
        </Media>
      </Card.Body>
      <Link to={`/posts/${id}`}>
        <Card.Img src={image} alt={title} />
      </Link>
      <Card.Body>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {content && <Card.Text>{content}</Card.Text>}
      </Card.Body>
      <div className={styles.PostBar}>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>Log in to like posts</Tooltip>}
        >
          <i className="far fa-heart" />
        </OverlayTrigger>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>Log in to comment posts</Tooltip>}
        >
          <i className="far fa-comments" />
        </OverlayTrigger>
        
      </div>
    </Card>
  );
};

export default Post;
