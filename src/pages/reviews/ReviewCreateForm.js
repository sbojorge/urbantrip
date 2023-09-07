import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

import { useHistory, useParams } from "react-router-dom";

import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import { axiosReq } from "../../api/axiosDefaults";
import { useRedirect } from "../../hooks/useRedirect";
import { Rating } from "react-simple-star-rating";

const ReviewCreateForm = () => {
  useRedirect("loggedOut");
  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const [reviewData, setReviewData] = useState({
    serviceId: id,
    content: "",
    
  });
  const { serviceId, content } = reviewData;

  const history = useHistory();

  const [rating, setRating] = useState(0);

  const handleRating = (rate) => {
    setRating(rate / 20);    
  };

  const handleChange = (event) => {
    setReviewData({
      ...reviewData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("service", serviceId);
    formData.append("rating", rating);
    formData.append("content", content);

    try {
      await axiosReq.post("/reviews/", formData);
      history.goBack();
    } catch (err) {
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Rating
          onClick={handleRating}
          showTooltip
          tooltipArray={["Terrible", "Bad", "Average", "Great", "Perfect"]}
        />
       
      </Form.Group>
      <Form.Group>
        <Form.Label>My review</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="content"
          value={content}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Button
        className={`mx-2 ${btnStyles.button} ${btnStyles.BlackOutline}`}
        onClick={() => history.goBack()}
      >
        cancel
      </Button>
      <Button
        className={`${btnStyles.button} ${btnStyles.BlackOutline}`}
        type="submit"
      >
        save
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Container className={appStyles.Content}>{textFields}</Container>
    </Form>
  );
};

export default ReviewCreateForm;
