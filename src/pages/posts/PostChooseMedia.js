import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import styles from "../../styles/ChooseMedia.module.css";
import appStyles from "../../App.module.css";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { useRedirect } from "../../hooks/useRedirect";

const PostChooseMedia = () => {
  useRedirect("loggedOut");
  return (
    <Row>
      <Col md={6} className="mt-4">
        <Container className={styles.Choice}>
          <div className={styles.first}>
            <Image
              className={styles.ImageIcon}
              src={
                "https://res.cloudinary.com/dvvr7cpfs/image/upload/v1689767375/image-upload.256x256_if4o2m.webp"
              }
            />
            <Link className={styles.Link} to="/posts/create/image">
              Create a post using a picture
            </Link>
          </div>
          <div className={styles.second}>
            <Image
              className={styles.ImageIcon}
              src={
                "https://res.cloudinary.com/dvvr7cpfs/image/upload/v1689767375/film.256x256_lclnzm.webp"
              }
            />
            <Link className={styles.Link} to="/posts/create/video">
              Create a post using a video
            </Link>
          </div>
        </Container>
      </Col>
    </Row>
  );
};

export default PostChooseMedia;
