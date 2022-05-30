import React, { useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

export const BotModal = (props) => {
  const [isModalOpen, setModal] = React.useState(false);

  useEffect(() => {
    if (props.open) {
      setModal(true);
    }
  }, []);

  return (
    <>
      <Modal show={isModalOpen}>
        <Modal.Header closeButton onClick={props.onClosed}>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.body}</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={props.onClosed}>
            {props.buttonTextOne}
          </Button>
          <Button variant="dark" onClick={props.onClik}>
            {props.buttonTextTwo}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
