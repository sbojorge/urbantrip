import React, { useEffect, useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";

import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import { useHistory, useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

const PostEditForm = () => {
  const [errors, setErrors] = useState({});

  const [postData, setPostData] = useState({
    title: "",
    content: "",
    image: "",
    video: "",   
  });

  const { title, content, image, video, } = postData;

  // const [source, setSource] = useState({
  //   video: "",
  // });
  
  // const { video } = source;

  const imageInput = useRef(null);
  const videoInput = useRef(null);
  const history = useHistory();
  const { id } = useParams();
  const [isVideo, setIsVideo] = useState(false);

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/${id}/`);
        const { title, content, image, video, is_owner } = data;

        setIsVideo(!video.includes("film-camera") && image.includes("old-time-camera"))

        is_owner
          ? setPostData({ title, content, image, video })
          : history.push("/");
      } catch (err) {
        // console.log(err);
      }
    };

    handleMount();
  }, [history, id]);

  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeFile = (event) => {
    if (image && event.target.files.length) {
      URL.revokeObjectURL(image);
      setPostData({
        ...postData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    } else {
      URL.revokeObjectURL(video);
      setPostData({
        ...postData,
        video: URL.createObjectURL(event.target.files[0]),
      });
    }
    
  };

  // const handleChangeVideo = (event) => {
  //   if (event.target.files.length) {
  //     URL.revokeObjectURL(video);
  //     setSource({
  //       ...source,
  //       video: URL.createObjectURL(event.target.files[0]),
  //     });
  //   }
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    // if(image) {
    //   formData.append("image", imageInput.current.files[0]);
    // } else {
    //   formData.append("video", videoInput.current.files[0]);
    // }    
    
    try {
      await axiosReq.put(`/posts/${id}/`, formData);
      history.push(`/posts/${id}`);
    } catch (err) {
      console.log(err);
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

      <Button
        className={`${btnStyles.button} m-3`}
        onClick={() => history.goBack()}
      >
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
                {
                  !isVideo
                    ? <Image className={appStyles.Image} src={image} rounded />
                    : <video src={video} width={400} height={400} controls />
                }
                
              </figure>
              {!isVideo? (
                <>
                  <Form.Label
                    className={`${btnStyles.button} btn`}
                    htmlFor="image-upload"
                  >
                    Change the image
                  </Form.Label>
                  <Form.File
                    id="image-upload"
                    accept="image/*"
                    onChange={handleChangeFile}
                    ref={imageInput}
                  />
                </>
              ) : (
                <>
                  <Form.Label
                    className={`${btnStyles.button} btn`}
                    htmlFor="video-upload"
                  >
                    Change the video
                  </Form.Label>
                  <input
                    type="file"
                    accept=".mp4, .webm, .flv, .mov, .ogv, .3gp, .3g2, .wmv, .mpeg, .mkv, .avi"
                    onChange={handleChangeFile}
                    ref={videoInput}
                  />
                </>
              )}
            </Form.Group>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
};

export default PostEditForm;
