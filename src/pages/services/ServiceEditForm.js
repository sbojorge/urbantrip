import React, { useEffect, useRef, useState, useMemo } from "react";
import countryList from "react-select-country-list";

import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";

import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import { useHistory, useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

const ServiceEditForm = () => {
  const [errors, setErrors] = useState({});

  const [serviceData, setServiceData] = useState({
    category: "",
    name: "",
    country: "",
    city: "",
    phone_number: "",
    email: "",
    website: "",
    image: "",
  });

  const {
    category,
    name,
    country,
    city,
    phone_number,
    email,
    website,
    image,
  } = serviceData;

  const options = useMemo(() => countryList().getData(), []);

  const imageInput = useRef(null);
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
          image,
          is_owner,
        } = data;

        is_owner
          ? setServiceData({
              category,
              name,
              country,
              city,
              phone_number,
              email,
              website,
              image,
            })
          : history.push("/");
      } catch (err) {
        // console.log(err);
      }
    };

    handleMount();
  }, [history, id, options]);

  const handleChange = (event) => {
    setServiceData({
      ...serviceData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setServiceData({
        ...serviceData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("category", category);
    formData.append("name", name);
    formData.append("country", country);
    formData.append("city", city);
    formData.append("phone_number", phone_number);
    formData.append("email", email);
    formData.append("website", website);
    

    if (imageInput?.current?.files[0]) {
      formData.append("image", imageInput.current.files[0]);
    }

    try {
      await axiosReq.put(`/services/${id}/`, formData);
      history.push(`/services/${id}`);
    } catch (err) {
      // console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Category</Form.Label>
        <Form.Control
          as="select"
          name="category"
          value={category}
          onChange={handleChange}
        >
          <option>Select a service category</option>
          <option>TOUR_GUIDE</option>
          <option>ACCOMODATION</option>
          <option>RESTAURANT</option>
          <option>TRAVEL_AGENCY</option>
          <option>OTHER</option>
        </Form.Control>
      </Form.Group>
      {errors?.category?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.name?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>Country</Form.Label>
        <Form.Control
          as="select"
          name="country"
          value={country}
          onChange={handleChange}
        >
          <option value="">Select a country</option> {/* Default option */}
          {options.map((country, index) => (
            <option key={index} value={country.value}>
              {country.label}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      {errors?.country?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>City</Form.Label>
        <Form.Control
          type="text"
          name="city"
          value={city}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.city?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>Phone number</Form.Label>
        <Form.Control
          type="text"
          name="phone_number"
          value={phone_number}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.phone_number?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.email?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>Website</Form.Label>
        <Form.Control
          type="text"
          name="website"
          value={website}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.website?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      
      <Button
        className={`mx-2 ${btnStyles.button} ${btnStyles.BlackOutline}`}
        onClick={() => history.goBack()}
      >
        cancel
      </Button>
      <Button
        className={`${btnStyles.button} ${btnStyles.BlackOutline}`}
        type="submit"
      >
        save
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              <figure>
                <Image className={appStyles.Image} src={image} rounded />
              </figure>
              <div>
                <Form.Label
                  className={`${btnStyles.button} btn`}
                  htmlFor="image-upload"
                >
                  Change the image
                </Form.Label>
              </div>

              <Form.File
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
              />
            </Form.Group>
            {errors?.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
};

export default ServiceEditForm;
