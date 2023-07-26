import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";

import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import Asset from "../../components/Asset";

import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

const PostCreateFormVideo = () => {
  const [errors, setErrors] = useState({});

  const [source, setSource] = useState({
    title: "",
    content: "",
    video: "",
  });
  const { title, content, video } = setSource;

  const videoInput = useRef(null);
  const history = useHistory();

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
    formData.append("video", videoInput.current.files[0]);

    try {
      const { data } = await axiosReq.post("/posts/", formData);
      history.push(`/posts/${data.id}`);
    } catch (err) {
      console.log(err);
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

      {/* Add tinymce as text editor in the description field */}
      <Form.Group>
        <Form.Label>Description</Form.Label>
        {/* <Editor
          apiKey="9z25n8ixigw8dh0nx9nyhgmo9jd0kzbhfvr6sr2n42e0id51"
          init={{menubar: "format"}}          
          plugins="emoticons fullscreen wordcount advlist lists"
          toolbar="undo redo selectall | cut copy paste | styleselect | bold italic underline strikethrough | fontselect
          fontsizeselect formatselect | alignleft aligncenter alignright alignjustify
          numlist bullist | forecolor backcolor emoticons |  removeformat fullscreen"
          textareaName="content"
          value={content}
          initialValue="This field is optional" 
          onChange={handleChange}
        /> */}
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

      <Button
        className={`${btnStyles.button} m-3`}
        onClick={() => history.goBack()}
      >
        cancel
      </Button>
      <Button className={btnStyles.button} type="submit">
        create
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
              {/* The preview doesn't work anymore nor the click or tap */}
              {video ? (
                <>
                  <video
                    className={appStyles.Image}
                    src={video}
                    controls
                    width="100%"
                    rounded
                  />

                  <div>
                    <Form.Label
                      className={`${btnStyles.button} btn`}
                      htmlFor="video-upload"
                    >
                      Change the video
                    </Form.Label>
                  </div>
                </>
              ) : (
                <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="video-upload"
                >
                  <Asset
                    src="https://res.cloudinary.com/dvvr7cpfs/image/upload/v1689795791/film.96x96_wj7imw.webp"
                    message="Click or tap to upload a video"
                  />
                </Form.Label>
              )}

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

export default PostCreateFormVideo;
