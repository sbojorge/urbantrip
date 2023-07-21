import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import appStyles from "../../App.module.css";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Post from "./Post";

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: post }] = await Promise.all([
          axiosReq.get(`/posts/${id}`),
        ]);
        setPost({ results: [post] });
        console.log(post);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <Post {...post.results[0]} setPosts={setPost} />
        <Container className={appStyles.Content}>Comments</Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        Would I use this space?
      </Col>
    </Row>
  );
};

export default PostPage;
