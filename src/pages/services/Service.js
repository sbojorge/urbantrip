import React from "react";

import styles from "../../styles/Service.module.css";
import btnStyles from "../../styles/Button.module.css";

import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";

import { Link, useHistory } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { ControlsDropdown } from "../../components/ControlsDropdown";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";
import { Rating } from "react-simple-star-rating";

const Service = (props) => {
  const {
    id,
    owner,
    average_rating,
    category,
    name,
    country,
    city,
    image,
    updated_on,
    servicePage,
    reviews_count,
  } = props;

  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const profile_id = currentUser?.profile_id;
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  const handleEdit = () => {
    history.push(`/services/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/services/${id}/`);
      window.location.href = "/";
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <Card className={styles.Service}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link className={styles.serviceLinks} to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            <span>{updated_on}</span>
            {is_owner && servicePage && (
              <ControlsDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </div>
        </Media>
      </Card.Body>
      <Link to={`/services/${id}`}>
        <Card.Img src={image} alt={name} />
      </Link>
      <Card.Body>
        {name && <Card.Title className="text-center">{name}</Card.Title>}
        <Row>
          <Col>{category && <Card.Text>{category}</Card.Text>}</Col>
          <Col>{country && <Card.Text>{country}</Card.Text>}</Col>
          <Col>{city && <Card.Text>{city}</Card.Text>}</Col>
        </Row>
        <p className="text-center">
          <Rating
            readonly
            initialValue={average_rating}
            size={40}
            fillColor="#6A62F8"
          />
        </p>
        {reviews_count && (
          <Card.Title className="text-center">
            reviews: {reviews_count}
          </Card.Title>
        )}
        <div>
          {!is_owner && (
            <>
              <i className={`far fa-star ${styles.serviceIcons}`} />
              <Button
                className={`mx-2 ${btnStyles.button} ${btnStyles.BlackOutline}`}
                onClick={() => history.push(`/reviews/${id}/create`)}
              >
                Leave your rate
              </Button>
            </>
          )}

          <Link to={`/services/${id}`}>
            <i className={`${styles.serviceIcons} far fa-address-book`} />
            <Button
              className={`mx-2 ${btnStyles.button} ${btnStyles.BlackOutline}`}
            >
              Contact details
            </Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Service;
