import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function DisbandModal(props) {
  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Disand Team</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        You are about to disband this team. This action cannot be undone.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={props.onHide}>Cancel</Button>
        <Button variant="dark" onClick={props.confirm}>Confirm</Button>
      </Modal.Footer>
    </Modal>
  );
}
