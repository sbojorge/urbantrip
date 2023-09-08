import React from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import styles from "../styles/DeleteConfirmation.module.css";
import btnStyles from "../styles/Button.module.css";

const DeleteConfirmation = (props) => {
  const { show, handleClose, handleDelete, } = props;

  return (
    <>
      <Modal  show={show} onHide={handleClose}>
        <Modal.Header className={styles.Header} closeButton>
          <Modal.Title>Delete confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.Modal}>Please confirm that you want to delete or click on cancel</Modal.Body>
        <Modal.Footer className={styles.Footer}>
          <Button className={`${styles.cancelButton} m-2`} onClick={handleClose}>
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
