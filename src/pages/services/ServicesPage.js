import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Service from "./Service";
import Asset from "../../components/Asset";

import appStyles from "../../App.module.css";
import styles from "../../styles/ServicesPage.module.css";

import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

import NoResults from "../../assets/NoResults.png";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";

const ServicesPage = ({ message }) => {
  const [services, setServices] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const currentUser = useCurrentUser();

  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await axiosReq.get(`/services/?search=${query}`);
        setServices(data);
        setHasLoaded(true);
      } catch (err) {
        // console.log(err);
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchServices();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [query, currentUser]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <i className={`fas fa-search ${styles.SearchIcon}`} />
        <Form
          className={styles.SearchBar}
          onSubmit={(event) => event.preventDefault()}
        >
          <Form.Control
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="text"
            className="mr-sm-2"
            placeholder="Search by service category, country or city"
          />
        </Form>

        {hasLoaded ? (
          <>
            {services.results.length ? (
              <InfiniteScroll
                children={services.results.map((service) => (
                  <Service
                    key={service.id}
                    {...service}
                    setServices={setServices}
                  />
                ))}
                dataLength={services.results.length}
                loader={<Asset spinner />}
                hasMore={!!services.next}
                next={() => fetchMoreData(services, setServices)}
              />
            ) : (
              <Container className={appStyles.Content}>
                <Asset src={NoResults} message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>
    </Row>
  );
};

export default ServicesPage;
