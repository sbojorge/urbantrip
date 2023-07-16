import React, { useState } from "react";
import styles from "../../styles/SignUpInForm.module.css";
import btn from "../../styles/Button.module.css";
import { Col, Container, Row, Form, Button, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

const SignUpForm = () => {
  const [signUpData, setSignUpData] = useState({
    fullname: "",
    username: "",
    password1: "",
    password2: "",
  });
  const { fullname, username, password1, password2 } = signUpData;

  const [errors, setErrors] = useState({});

  const history = useHistory();

  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/dj-rest-auth/registration/", signUpData);
      history.push("/signin");
    } catch (err) {
      setErrors(err.response?.data)
    }
  };

  return (
    <Row className={styles.form}>
      <Col>
        <Container>
          <h1>Sign Up</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="fullname">
              <Form.Label>Full name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Full name"
                name="fullname"
                value={fullname}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.fullname?.map((message, idx) => (
              <Alert variant="dark" key={idx}>{message}</Alert>
            ))}
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="username"
                name="username"
                value={username}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.username?.map((message, idx) => (
              <Alert variant="dark" key={idx}>{message}</Alert>
            ))}
            <Form.Group controlId="password1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password1"
                value={password1}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password1?.map((message, idx) => (
              <Alert variant="dark" key={idx}>{message}</Alert>
            ))}
            <Form.Group controlId="password2">
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password2"
                value={password2}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password2?.map((message, idx) => (
              <Alert variant="dark" key={idx}>{message}</Alert>
            ))}

            <Button type="submit" className={btn.button}>
              <strong>Sign Up</strong>
            </Button>
            {errors.non_field_errors?.map((message, idx) => (
              <Alert variant="dark" key={idx}>{message}</Alert>
            ))}
          </Form>
          <Link to="/signin">
            Already have an account?<span>Sign in</span>
          </Link>
        </Container>
      </Col>
      <Col>
        <p>Image should come here</p>
      </Col>
    </Row>
  );
};

export default SignUpForm;
