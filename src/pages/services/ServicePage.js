import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";

import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

import ServiceDetail from "./ServiceDetail";
import ServiceContactDetails from "./ServiceContactDetails";
import ReviewsPage from "../reviews/ReviewsPage";

const ServicePage = () => {
  const { id } = useParams();
  const [service, setService] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data: service } = await axiosReq.get(`/services/${id}`);
        setService({ results: [service] });
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <ServiceContactDetails {...service.results[0]} mobile />
        <ServiceDetail
          {...service.results[0]}
          setService={setService}
          servicePage
        />
        <Container className={appStyles.Content}>
          <ReviewsPage />
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <ServiceContactDetails {...service.results[0]} />
      </Col>
    </Row>
  );
};

export default ServicePage;
