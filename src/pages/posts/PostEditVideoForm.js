import React, { useEffect, useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import { useHistory, useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

const PostEditVideoForm = () => {
  const [errors, setErrors] = useState({});

  const [source, setSource] = useState({
    title: "",
    content: "",
    video: "",
  });
  const { title, content, video } = source;

  const videoInput = useRef(null);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/${id}/`);
        const { title, content, video, is_owner } = data;

        is_owner ? setSource({ title, content, video }) : history.push("/");
      } catch (err) {
        // console.log(err);
      }
    };

    handleMount();
  }, [history, id]);

  const handleChange = (event) => {
    setSource({
      ...source,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeVideo = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(video);
      setSource({
        ...source,
        video: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);

    if (videoInput?.current?.files[0]) {
      formData.append("video", videoInput.current.files[0]);
    }

    try {
      await axiosReq.put(`/posts/${id}/`, formData);
      history.push(`/posts/${id}`);
    } catch (err) {
      // console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          placeholder="This field is optional"
          value={title}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Description</Form.Label>

        <Form.Control
          as="textarea"
          rows={6}
          name="content"
          value={content}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.description?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Button className={`${btnStyles.button} m-3`}  onClick={() => history.goBack()}>
        cancel
      </Button>
      <Button className={btnStyles.button} type="submit">
        save
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              <figure>
                <video className={appStyles.Image} src={video} rounded="true" controls width="100%" />
              </figure>
              <div>
                <Form.Label
                  className={`${btnStyles.button} btn`}
                  htmlFor="video-upload"
                >
                  Change the video
                </Form.Label>
              </div>

              <input
                type="file"
                accept=".mp4, .webm, .flv, .mov, .ogv, .3gp, .3g2, .wmv,
                .mpeg, .mkv, .avi"
                onChange={handleChangeVideo}
                ref={videoInput}
              />
            </Form.Group>
            {errors?.video?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
};

export default PostEditVideoForm;
