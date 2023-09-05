import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";

import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

import ServiceDetail from "./ServiceDetail";
import ReviewsPage from "../reviews/ReviewsPage";

const ServicePage = () => {
  const { id } = useParams();
  const [service, setService] = useState({ results: [] });  
  const [reviews, setReviews] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: service }, { data: reviews }] = await Promise.all([
          axiosReq.get(`/services/${id}`),
          axiosReq.get(`/reviews/?service=${id}`),
        ]);
        setService({ results: [service] });
        setReviews(reviews);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <ServiceDetail />

        <Container className={appStyles.Content}>
          <ReviewsPage />
        </Container>
      </Col>
    </Row>
  );
};

export default ServicePage;
