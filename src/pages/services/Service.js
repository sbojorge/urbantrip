import React from "react";

import styles from "../../styles/Service.module.css";
import btnStyles from "../../styles/Button.module.css";

import { useCurrentUser } from "../../contexts/CurrentUserContext";

import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { Link, useHistory } from "react-router-dom";
import { ControlsDropdown } from "../../components/ControlsDropdown";
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
    phone_number,
    email,
    website,
    facebook,
    instagram,
    image,
    updated_on,
    servicePage,
    reviews_count,
    review_id,
  } = props;

  const currentUser = useCurrentUser();
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
    <Card className={styles.Post}>
      <Card.Body>
        <Media className="align-items-center justify-content-end">
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
      <Card.Img src={image} alt={name} />      
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
            reviews:{reviews_count}
          </Card.Title>
        )}
        <div className={styles.PostBar}>
          {!is_owner && (
            <>
              <i className={`far fa-star ${styles.posticons}`} />
              <Button
                className={`mx-2 ${btnStyles.button} ${btnStyles.BlackOutline}`}
                onClick={() => history.push(`/reviews/${id}/create`)}
              >
                Leave your rate
              </Button>
            </>
          )}

          <Link to={`/services/${id}`}>
            <i className={`${styles.posticons} far fa-address-book`} />
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
