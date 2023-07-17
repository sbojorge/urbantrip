import React, { useState } from "react";

import styles from "../../styles/SignUpInForm.module.css";
import btnstyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import iconstyles from "../../styles/NavBar.module.css";
import signup from "../../assets/navbar/sign-up.png";

import { Col, Container, Row, Form, Button, Alert } from "react-bootstrap";

import { Link, useHistory } from "react-router-dom";
import axios from "axios";

const SignUpForm = () => {
  const [signUpData, setSignUpData] = useState({
    fullname: "", // it seems to have a bug
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
      setErrors(err.response?.data);
    }
  };

  return (
    <Row className={styles.Row}>
      <Col className="my-auto py-2 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4`}>
          <h1 className={styles.Header}>sign up</h1>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="fullname">
              <Form.Label className="d-none">Full name</Form.Label>
              <Form.Control
                className={styles.Input}
                type="text"
                placeholder="Full name"
                name="fullname"
                value={fullname}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.fullname?.map((message, idx) => (
              <Alert variant="dark" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group controlId="username">
              <Form.Label className="d-none">Username</Form.Label>
              <Form.Control
                className={styles.Input}
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.username?.map((message, idx) => (
              <Alert variant="dark" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group controlId="password1">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Password"
                name="password1"
                value={password1}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password1?.map((message, idx) => (
              <Alert variant="dark" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group controlId="password2">
              <Form.Label className="d-none">Confirm password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Confirm password"
                name="password2"
                value={password2}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password2?.map((message, idx) => (
              <Alert variant="dark" key={idx}>
                {message}
              </Alert>
            ))}

            <span>
              <img src={signup} alt="signup" className={iconstyles.NavIcon} />
            </span>
            <Button type="submit" className={btnstyles.button}>
              Sign Up
            </Button>
            {errors.non_field_errors?.map((message, idx) => (
              <Alert variant="dark" key={idx}>
                {message}
              </Alert>
            ))}
          </Form>
        </Container>

        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/signin">
            Already have an account? <span>Sign in</span>
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
