import React from 'react'
import { Button, Modal } from 'react-bootstrap'

export default function RemoveModal(props) {

    return <Modal show={props.show} onHide={props.onHide}>
        <Modal.Header closeButton><Modal.Title>Remove User</Modal.Title></Modal.Header>
        <Modal.Body>
            You are about to remove this user from your team. This action cannot be undone.
        </Modal.Body>
        <Modal.Footer><Button variant='outline-danger' onClick={props.onHide}>Cancel</Button><Button variant='dark' onClick={props.remove}>Confirm</Button></Modal.Footer>
    </Modal>
}