import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import { useLocation, useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Review from "./Review";
import Asset from "../../components/Asset";

import appStyles from "../../App.module.css";

import { axiosReq } from "../../api/axiosDefaults";

import NoResults from "../../assets/NoResults.png";
import { fetchMoreData } from "../../utils/utils";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const ReviewsPage = ({ message }) => {
  const [reviews, setReviews] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const currentUser = useCurrentUser();
  const { id } = useParams();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await axiosReq.get(`/reviews/?service=${id}`);
        setReviews(data);
        setHasLoaded(true);
      } catch (err) {}
    };    

    setHasLoaded(false);
    fetchReviews();
  }, [pathname, currentUser, id]);

  return (
    <Row className="h-100 d-flex justify-content-center">
      <Col className="py-2 p-0 p-lg-2" lg={8}>        

        {hasLoaded ? (
          <>
            {reviews.results.length ? (
              <InfiniteScroll
                children={reviews.results.map((service) => (
                  <Review key={service.id} {...service} />
                ))}
                dataLength={reviews.results.length}
                loader={<Asset spinner />}
                hasMore={!!reviews.next}
                next={() => fetchMoreData(reviews, setReviews)}
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

export default ReviewsPage;
