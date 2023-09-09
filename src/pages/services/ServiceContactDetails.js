import React from "react";

import styles from "../../styles/ContactDetails.module.css";

import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

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
  } = props;
  
  return (
    
      <Card className={styles.contactCard}>
        <Card.Body>
          <Card.Header as="h1" >Contact details</Card.Header>
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
              <i className={`${styles.contactIcons} fa-brands fa-instagram`}></i>
              {instagram}
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    
  );
};

export default ServiceContactDetails;
