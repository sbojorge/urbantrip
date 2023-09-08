import React, { useState } from "react";

import styles from "../../styles/Comment.module.css";

import Media from "react-bootstrap/Media";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { ControlsDropdown } from "../../components/ControlsDropdown";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";
import CommentEditForm from "./CommentEditForm";
import DeleteConfirmation from "../../components/DeleteConfirmation";

const Comment = (props) => {
  const {
    profile_id,
    profile_image,
    owner,
    updated_on,
    content,
    id,
    setPost,
    setComments,
  } = props;

  const [showEditForm, setShowEditForm] = useState(false);

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const [show, setShow] = useState(false);
  const [type, setType] = useState("");
  const handleShow = () => {
    setShow(true);
    setType("comment");
  };

  const handleClose = () => setShow(false);

  const handleCommentDelete = async () => {
    try {
      await axiosRes.delete(`/comments/${id}/`);
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count - 1,
          },
        ],
      }));

      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.filter((comment) => comment.id !== id),
      }));
    } catch (err) {}
  };

  return (
    <>
      <hr />
      <Media>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>
        <Media.Body className="align-self-center ml-2">
          <span className={styles.Owner}>{owner}</span>
          <span className={styles.Date}>{updated_on}</span>
          {showEditForm ? (
            <CommentEditForm
              id={id}
              profile_id={profile_id}
              content={content}
              profileImage={profile_image}
              setComments={setComments}
              setShowEditForm={setShowEditForm}
            />
          ) : (
            <p>{content}</p>
          )}
        </Media.Body>
        {is_owner && !showEditForm && (
          <ControlsDropdown
            handleEdit={() => setShowEditForm(true)}
            handleShow={handleShow}
          />
        )}
      </Media>
      <DeleteConfirmation
        show={show}
        handleClose={handleClose}
        handleCommentDelete={handleCommentDelete}
        type={type}
      />
    </>
  );
};

export default Comment;
