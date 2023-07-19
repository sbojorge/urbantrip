import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import styles from "../../styles/ChooseMedia.module.css";
import { Link } from "react-router-dom/cjs/react-router-dom";

const PostChooseMedia = () => {
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
            <Link className={styles.Message} to="/posts/create/image">
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
            <Link className={styles.Message} to="/posts/create/video">
              Create a post using a video
            </Link>
          </div>
        </Container>
      </Col>
    </Row>
  );
};

export default PostChooseMedia;
