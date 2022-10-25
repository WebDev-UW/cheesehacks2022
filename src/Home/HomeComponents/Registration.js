import { update } from "lodash";
import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col, Alert } from "react-bootstrap";

export default function Registration(props) {
  const [updatedUser, setUpdatedUser] = useState(props.user ?? {});
  const [otherRestrictions, setOtherRestrictions] = useState(false);
  const [attestation, setAttestation] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (props.user) {
      setUpdatedUser(props.user);
    }
  }, [props.user]);

  function update(e) {
    const newUserInfo = JSON.parse(JSON.stringify(updatedUser));
    newUserInfo[e.target.id] = e.target.value;
    setUpdatedUser(newUserInfo);
  }

  function updateCheck(id) {
    console.log(id);
    const newUserInfo = JSON.parse(JSON.stringify(updatedUser));
    newUserInfo[id] = newUserInfo[id] ? 0 : 1;
    console.log(newUserInfo);
    setUpdatedUser(newUserInfo);
  }

  function upload() {
    const bodyToUpload = JSON.parse(JSON.stringify(updatedUser))
    bodyToUpload.registered = 1
    fetch('/api/user-utility/self', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(bodyToUpload)
    })
    .then(res => {
        if (res.ok) {
            return res.json()
        } else {
            throw new Error('An unexpected error occurred')
        }
    })
    .then(res => {
        console.log('ok!')
        props.setUser(bodyToUpload)
        props.onClose()
    })
    .catch(err => {
        console.log(err)
        setError(true)
    })
  }

  return (
    <Modal show={props.show} onHide={props.onClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Registration Form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error ? <Alert variant='danger'>
            <Alert.Heading>Error</Alert.Heading>
            <p>An unexpected error occurred. Please contact rswerner@wisc.edu</p>
            </Alert> : <></>}
        <Form>
          <Row>
            <Col>
              <h5>General</h5>
            </Col>
          </Row>
          <Row className="my-3">
            <Col>
              <Form.Group controlId="first_name">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  value={updatedUser.first_name}
                  onChange={(e) => update(e)}
                  maxLength="255"
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="last_name">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  value={updatedUser.last_name}
                  onChange={(e) => update(e)}
                  maxLength="255"
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row className="my-3">
            <Col>
              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  maxLength="255"
                  value={updatedUser.email}
                  onChange={(e) => update(e)}
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <h5>Diet</h5>
            </Col>
          </Row>
          <Row className="my-3">
            <Col>
              <Form.Group controlId="dietary_restriction">
                <Form.Check
                  checked={updatedUser.dietary_restriction}
                  onChange={(e) => updateCheck(e.target.id)}
                  label="I have a dietary restriction (e.g. vegetarian, no pork, allergies etc.)"
                />
                {!updatedUser.dietary_restriction && (
                  <Form.Text>
                    This will help us order the correct food for the event. If
                    you do not list a dietary restriction in advance, we cannot
                    gaurantee that we will have the correct food available for
                    you.
                  </Form.Text>
                )}
              </Form.Group>
              {updatedUser.dietary_restriction ? (
                <Alert>
                  <Alert.Heading>Specify Restriction(s)</Alert.Heading>
                  <Form.Group controlId="vegan">
                    <Form.Check
                      checked={updatedUser.vegan}
                      onChange={(e) => updateCheck(e.target.id)}
                      label="Vegan"
                    ></Form.Check>
                  </Form.Group>
                  <Form.Group controlId="vegetarian">
                    <Form.Check
                      checked={updatedUser.vegetarian}
                      onChange={(e) => updateCheck(e.target.id)}
                      label="Vegetarian"
                    />
                  </Form.Group>
                  <Form.Group controlId="lactose_intolerant">
                    <Form.Check
                      checked={updatedUser.lactose_intolerant}
                      onChange={(e) => updateCheck(e.target.id)}
                      label="Lactose Intolerant"
                    />
                  </Form.Group>
                  <Form.Group controlId="gluten_free">
                    <Form.Check
                      checked={updatedUser.gluten_free}
                      onChange={(e) => updateCheck(e.target.id)}
                      label="Gluten Intolerant"
                    />
                  </Form.Group>
                  <hr />
                  <Form.Group controlId="other">
                    <Form.Check
                      checked={otherRestrictions}
                      onChange={(e) => {
                        setOtherRestrictions(!otherRestrictions);
                      }}
                      label={
                        <div>
                          Other -{" "}
                          <small>
                            Religious Restrictions, Food Allergies, and all
                            other requests.
                          </small>
                        </div>
                      }
                    />
                  </Form.Group>
                  {otherRestrictions && (
                    <Form.Group controlId="additional_diet">
                      <Form.Label>Please Specify Other Restrictions</Form.Label>
                      <Form.Control
                        maxLength="255"
                        value={updatedUser.additional_diet}
                        onChange={(e) => update(e)}
                      ></Form.Control>
                    </Form.Group>
                  )}
                </Alert>
              ) : (
                <></>
              )}
            </Col>
          </Row>
          <Row className='my-3'>
            <Col>
              <h5>Confirmation</h5>
              <Form.Text>By checking the box below, you agree that you will attend the hackathon occurring on Saturday, November 12th at 12:00 PM to Sunday, November 13th at 12:00 PM (24 hours). You are not required to stay the entire duration of the hackathon, but fully intend on working on and submitting a hack during this time period.</Form.Text>
            </Col>
          </Row>
          <Row>
            <Col><Form.Group controlId='attestation'>
              <Form.Check checked={attestation} onChange={() => {setAttestation(!attestation)}} label="The information above is correct"></Form.Check>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-dark" onClick={props.onClose}>
          Cancel
        </Button>
        <Button disabled={!attestation} onClick={() => upload()} variant="dark">Submit</Button>
      </Modal.Footer>
    </Modal>
  );
}
