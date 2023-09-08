import React from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import btnStyles from "../styles/Button.module.css";

const DeleteConfirmation = (props) => {
  const { show, handleClose, handleDelete, } = props;

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please confirm that you want to delete or click on cancel</Modal.Body>
        <Modal.Footer>
          <Button className={`${btnStyles.button} m-2`} onClick={handleClose}>
            cancel
          </Button>
          <Button className={btnStyles.button} onClick={handleDelete}>
            confirm delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteConfirmation;
