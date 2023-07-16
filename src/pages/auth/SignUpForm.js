import React from "react";
import styles from "../../styles/SignUpInForm.module.css";
import btn from "../../styles/Button.module.css";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const SignUpForm = () => {
  return (
    <Row className={styles.form}>
      <Col>
        <Container>
          <h1>Sign Up</h1>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Full name</Form.Label>
              <Form.Control type="text" placeholder="Full name" />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="username" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Confirm password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Button type="submit" className={btn.button}>
              <strong>Sign Up</strong>
            </Button>
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
