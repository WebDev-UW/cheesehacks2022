import React, { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function NewTeamModal(props) {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [formErr, setErr] = useState(false)
    const navigate = useNavigate()

    function submit() {
        if (!name || !description) {
            setErr(true)
        } else {
            fetch(`/api/team-utility/team`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name: name,
                    description: description,
                    team_captain: props.user.id
                })
            })
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    throw new Error('An unexpected error occurred while making a team')
                }
            })
            .then(res => {
                const teamid = res.insertId
                fetch(`/api/team-utility/link/${teamid}`, {
                    method: 'POST'
                })
                .then(res => {
                    if (res.ok) {
                        return res.json()
                    } else {
                        throw new Error('An unexpected error occurred while trying to ')
                    }
                })
                .then(res => {
                    const userCopy = JSON.parse(JSON.stringify(props.user))
                        userCopy.team = null
                        props.setUser(userCopy)
                    navigate(`/teams/${teamid}`)
                })
                .catch(err => {
                    setErr(true)
                    console.log(err)
                })
                
            })
            .catch(err => {
                setErr(true)
                console.log(err)
            })
        }
    }

  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Create New Team</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {formErr && <Alert variant='danger'>An error occurred in your submission. Make sure all fields are filled out, and if they are, contact an administrator</Alert>}
        <p>
          This form will create a new team and designate you as the team
          captain. You will automatically become part of this team once created.
        </p>
        <Form>
            <Form.Group controlId='name'>
                <Form.Label>Team Name</Form.Label>
                <Form.Control maxLength='255' required value={name} onChange={e => setName(e.target.value)}></Form.Control>
                <Form.Text>You cannot currently change the name once set.</Form.Text>
            </Form.Group>
            <Form.Group controlId='description'>
                <Form.Label>Team Description</Form.Label>
                <Form.Control maxLength='255' as='textarea' required value={description} onChange={e => setDescription(e.target.value)}></Form.Control>
                <Form.Text>You cannot currently change the description once set.</Form.Text>
            </Form.Group>
        </Form>
        <h5 className='my-3'>How do people join my team?</h5>
        <p>They will need to go to your team page at <a href='/teams' target='_blank'>https://cheesehacks.webdevuw.org/teams</a>, log-in, and select "Join Team". Your team can have up to 4 members (including yourself). If needed, you can kick members from your team.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={props.onHide}>
          Cancel
        </Button>
        <Button variant="dark" onClick={() => submit()}>Create Team</Button>
      </Modal.Footer>
    </Modal>
  );
}
