import React, { useRef, useState } from "react";

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

import Asset from "../../components/Asset";

import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

const ServiceCreateForm = () => {
  const [errors, setErrors] = useState({});

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
  } = serviceData;

  const imageInput = useRef(null);
  const history = useHistory();

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

    formData.append("name", name);
    formData.append("country", country);
    formData.append("city", city);
    formData.append("phone_number", phone_number);
    formData.append("email", email);
    formData.append("website", website);
    formData.append("facebook", facebook);
    formData.append("instagram", instagram);
    formData.append("image", imageInput.current.files[0]);

    try {
      const { data } = await axiosReq.post("/services/", formData);
      history.push(`/services/${data.id}`);
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
          <option>Tour guide</option>
          <option>Accomodation</option>
          <option>Restaurant</option>
          <option>Travel agency</option>
          <option>Other</option>
        </Form.Control>
      </Form.Group>
      {errors?.category?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>Name or Company name</Form.Label>
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
          type="text"
          name="country"
          value={country}
          onChange={handleChange}
        />
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
          name="phone number"
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
      <Form.Group>
        <Form.Label>Facebook</Form.Label>
        <Form.Control
          type="text"
          name="facebook"
          value={facebook}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.facebook?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>Instagram</Form.Label>
        <Form.Control
          type="text"
          name="instagram"
          value={instagram}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.instagram?.map((message, idx) => (
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
        create
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
              {image ? (
                <>
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
                </>
              ) : (
                <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="image-upload"
                >
                  <Asset
                    src="https://res.cloudinary.com/dvvr7cpfs/image/upload/v1693225465/handshake.256x176_vv06fu.png"
                    message={"Click or tap to upload an image"}
                  />
                </Form.Label>
              )}

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

export default ServiceCreateForm;
