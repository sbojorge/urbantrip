import React, { useEffect, useState } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

import styles from "../../styles/ServiceCreateEditForm.module.css";
import appStyles from "../../App.module.css";

import { useHistory, useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { Rating } from "react-simple-star-rating";

const ServiceDetail = () => {
  // const [errors, setErrors] = useState({});

  const [serviceData, setServiceData] = useState({
    category: "",
    name: "",
    country: "",
    city: "",
    phone_number: "",
    email: "",
    website: "",
    facebook: "",
    instagram: "",
    image: "",
    average_rating: "",
  });

  const {
    category,
    name,
    country,
    city,
    phone_number,
    email,
    website,
    facebook,
    instagram,
    image,
    average_rating,
  } = serviceData;
  
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/services/${id}/`);
        const {
          category,
          name,
          country,
          city,
          phone_number,
          email,
          website,
          facebook,
          instagram,
          image,          
        } = data;
        setServiceData({
          category,
          name,
          country,
          city,
          phone_number,
          email,
          website,
          facebook,
          instagram,
          image,
        })
  
      } catch (err) {
        // console.log(err);
      }
    };

    handleMount();
  }, [history, id]);

  // const handleChange = (event) => {
  //   setServiceData({
  //     ...serviceData,
  //     [event.target.name]: event.target.value,
  //   });
  // };


  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const formData = new FormData();
    
  //   formData.append("category", category);
  //   formData.append("name", name);
  //   formData.append("country", country);
  //   formData.append("city", city);
  //   formData.append("phone_number", phone_number);
  //   formData.append("email", email);
  //   formData.append("website", website);
  //   formData.append("facebook", facebook);
  //   formData.append("instagram", instagram);    
  //   formData.append("image", image);
    

  //   try {
  //     await axiosReq.put(`/services/${id}/`, formData);
  //     history.push(`/services/${id}`);
  //   } catch (err) {
  //     // console.log(err);
  //     if (err.response?.status !== 401) {
  //       setErrors(err.response?.data);
  //     }
  //   }
  // };

  return (
    <Row>
      <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
        <Container
          className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
        >
          <Card>
            <Card.Img className={appStyles.Image} src={image} rounded />
            <Card.Body>
              <Card.Title className="text-center">{name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted text-center">
                Category: {category}
              </Card.Subtitle>

              <ListGroup variant="flush">
                <ListGroup.Item>
                  <i className={`${styles.icons} fas fa-location-dot`}></i>
                  {city},{country}
                </ListGroup.Item>
                <ListGroup.Item>
                  <i className={`${styles.icons} fas fa-globe`}></i>
                  {website}
                </ListGroup.Item>
                <ListGroup.Item>
                  <i className={`${styles.icons} fas fa-at`}></i>
                  {email}
                </ListGroup.Item>
                <ListGroup.Item>
                  <i className={`${styles.icons} fas fa-phone`}></i>
                  {phone_number}
                </ListGroup.Item>
                <ListGroup.Item>
                  <i className={`${styles.icons} fa-brands fa-facebook`}></i>
                  {facebook}
                </ListGroup.Item>
                <ListGroup.Item>
                  <i className={`${styles.icons} fa-brands fa-instagram`}></i>
                  {instagram}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Container>
      </Col>
      <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
        <Container className={appStyles.Content}>
          <Rating
            readonly
            initialValue={average_rating}
            size={40}
            fillColor="#6A62F8"
          />
        </Container>
      </Col>
    </Row>
  );
};

export default ServiceDetail;
