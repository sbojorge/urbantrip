import React from "react";

import styles from "../../styles/ServiceContactDetails.module.css";
import appStyles from "../../App.module.css";

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

import { useHistory } from "react-router-dom";

const ServiceContactDetails = (props) => {
  const {
    name,
    category,
    country,
    city,
    phone_number,
    email,
    website,
    facebook,
    instagram,
    mobile,
  } = props;

  const history = useHistory();

  return (
    <Container
      className={`${appStyles.Content} ${
        mobile && "d-lg-none text-center mb-3"
      }`}
    >
      <Card>
        <Card.Body>
          <Card.Header as="h1" className="text-center">
            Contact details
          </Card.Header>
          <Card.Title className="py-2 text-center">Name: {name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted text-center">
            Category: {category}
          </Card.Subtitle>

          <ListGroup variant="flush">
            <ListGroup.Item>
              <i className={`${styles.contactIcons} fas fa-location-dot`}></i>
              {city},{country}
            </ListGroup.Item>
            <ListGroup.Item>
              <i className={`${styles.contactIcons} fas fa-globe`}></i>
              {website}
            </ListGroup.Item>
            <ListGroup.Item>
              <i className={`${styles.contactIcons} fas fa-at`}></i>
              {email}
            </ListGroup.Item>
            <ListGroup.Item>
              <i className={`${styles.contactIcons} fas fa-phone`}></i>
              {phone_number}
            </ListGroup.Item>
            <ListGroup.Item>
              <i className={`${styles.contactIcons} fa-brands fa-facebook`}></i>
              {facebook}
            </ListGroup.Item>
            <ListGroup.Item>
              <i
                className={`${styles.contactIcons} fa-brands fa-instagram`}
              ></i>
              {instagram}
            </ListGroup.Item>
          </ListGroup>
          <Button
            className={styles.button}
            onClick={() => history.goBack()}
          >
            go back
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ServiceContactDetails;
