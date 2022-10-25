import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  Container,
  Spinner,
  Alert,
} from "react-bootstrap";
import Registration from "./HomeComponents/Registration";

export default function Home(props) {
  const [showAdmin, setShowAdmin] = useState(true);
  const [showIncomplete, setShowIncomplete] = useState(true);
  const [showRegistered, setShowRegistered] = useState(true);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false)
  const [awhile, isAwhile] = useState(false)


  useEffect(() => {
    setTimeout(() => {isAwhile(true)}, 5000)
  }, [])

  if (props.user) {

  
  return (
    <Container>
      <link
        href="https://fonts.googleapis.com/css?family=Raleway"
        rel="stylesheet"
      ></link>
      <Row className="my-3">
        <Col lg="12" className='d-flex flex-row align-items-end'>
          <h1
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontWeight: 300,
              fontSize: "40px",
              color: "#080808",
            }}
          >
            Welcome,{" "}
            {props.user &&
              (props.user.first_name ?? <Spinner animation="border" />)}
          </h1><small style={{marginBottom: '8px'}}><a href='/logout'>(logout)</a></small>
        </Col>
      </Row>
      {props.user && props.user.admin === 1 && (
        <Alert
          show={showAdmin}
          onClose={() => {
            setShowAdmin(false);
          }}
          variant="info"
          dismissible
        >
          <Alert.Heading>Administrator</Alert.Heading>
          <p>
            You are currently listed as an administrator of CheeseHacks. Pay
            special attention that you have more access to create, modify, and
            delete data than is available to registrants. You can also access
            additional information using the{" "}
            <Alert.Link href="/admin">administrator dashboard</Alert.Link>.
            Please contact Ryan S Werner (rswerner@wisc.edu) with any questions
            or concerns.
          </p>
        </Alert>
      )}
      {props.user && props.user.registered === 0 && (
        <Alert
          show={showIncomplete}
          onClose={() => {
            setShowIncomplete(false);
          }}
          variant="danger"
          dismissible
        >
          <Alert.Heading>Registration Incomplete</Alert.Heading>
          <p>
            You have not completed your registration for CheeseHacks 2022.
            Please fill out the registration form so that you can secure your
            spot at the hackathon.
          </p>
        </Alert>
      )}
      {props.user && props.user.registered === 1 && (
        <Alert
          show={showRegistered}
          onClose={() => {
            setShowRegistered(false);
          }}
          variant="success"
          dismissible
        >
          <Alert.Heading>Registration Complete</Alert.Heading>
          <p>
            Your registration has been completed. There is nothing else that you
            need to do at this time. Consider joining or creating a team prior
            to the hackathon if you have not already. If we need any additional
            information prior to the hackathon, we will contact you over email.
          </p>
        </Alert>
      )}
      <Row className="my-3">
        <Col lg="6" className="d-flex flex-row">
          <Card className="shadow">
            <Card.Body>
              <Card.Title>Team Management</Card.Title>
              <p>
                You have not yet joined a team. You do not need to join a team
                before the hackathon, but we will help you form into teams of
                2-4 people at the start if you have not joined one in advance.
              </p>
              <Container>
                <Row>
                  <Col sm="6">
                    <Card className="shadow my-2">
                      <Card.Img
                        height="250px"
                        style={{ objectFit: "cover" }}
                        varaint="top"
                        src="/api/files/create-team.jpg"
                      ></Card.Img>
                      <Card.Body className="d-flex flex-column">
                        <Card.Title>Create Team</Card.Title>
                        <Card.Text>
                          This is for you if you want to create a new team. You
                          don't have to have three members to create a team, you
                          may create a team with just two members and add
                          another later.
                        </Card.Text>
                        <Button variant="primary" className="mt-auto">
                          Create Team
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col sm="6">
                    <Card className="shadow my-2">
                      <Card.Img
                        height="250px"
                        style={{ objectFit: "cover" }}
                        varaint="top"
                        src="/api/files/join-team.jpg"
                      ></Card.Img>
                      <Card.Body className="d-flex flex-column">
                        <Card.Title>Join Team</Card.Title>
                        <Card.Text>
                          This is for you if you want to join an already created
                          team.
                        </Card.Text>
                        <Button variant="primary" className="mt-auto">
                          Join Team
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </Card.Body>
          </Card>
        </Col>
        <Col lg="6">
          <Card>
            <Card.Body>
              <Card.Title>Registration</Card.Title>
              <p>
                Thank you for your interest in CheeseHacks 2022! We are excited
                and prepared to have more hackers this year than ever before.
                However, we will need some additional information about you in
                order to make everything run smoothly.
              </p>
              {props.user && !props.user.registered ? <Button variant='dark' onClick={() => {setShowRegistrationModal(true)}}>Register</Button> : <p style={{color: 'green'}}>Registration Completed. Thank you!</p>}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Registration user={props.user} show={showRegistrationModal} onClose={() => {setShowRegistrationModal(false)}} setUser={props.setUser} />
    </Container>
  );
        } else {
          return <Container><Row><Col className='text-center my-5'><Spinner animation='border' />{awhile ? <p className='text-muted'>If this is taking a long time, make sure that you are <a href='/login'>signed in</a></p> : <></>}</Col></Row></Container>
        }
}
