import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  Container,
  Spinner,
  Alert,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import NewTeamModal from "../Teams/NewTeamModal";
import Registration from "./HomeComponents/Registration";

export default function Home(props) {
  const [showAdmin, setShowAdmin] = useState(true);
  const [showIncomplete, setShowIncomplete] = useState(true);
  const [showRegistered, setShowRegistered] = useState(true);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [showNewTeamModal, setShowNewTeamModal] = useState(false);
  const [myTeam, setMyTeam] = useState(null);
  const [awhile, isAwhile] = useState(false);
  const [countUsers, setCountUsers] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      isAwhile(true);
    }, 5000);
  }, []);

  useEffect(() => {
    fetch("/api/user-utility/stats?registered=1", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        return res.ok
          ? res.json()
          : new Error(
              "An unexpected error occurred while loading the number of users enrolled"
            );
      })
      .then((data) => {
        setCountUsers(data[0].count_of_users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (props.user && props.user.team) {
      fetch(`/api/team-utility/team/${props.user.team}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error("An error occurred while loading team data");
          }
        })
        .then((res) => {
          setMyTeam(res[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [props]);

  if (props.user) {
    return (
      <Container>
        <link
          href="https://fonts.googleapis.com/css?family=Raleway"
          rel="stylesheet"
        ></link>
        <Row className="my-3">
          <Col lg="12" className="d-flex flex-row align-items-end">
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
            </h1>
            <small style={{ marginBottom: "8px" }}>
              <a href="/logout">(logout)</a>
            </small>
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
              Please contact Ryan S Werner (rswerner@wisc.edu) with any
              questions or concerns.
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
              Your registration has been completed. There is nothing else that
              you need to do at this time. Consider joining or creating a team
              prior to the hackathon if you have not already. If we need any
              additional information prior to the hackathon, we will contact you
              over email.
            </p>
            <hr />
            <p>Join the CheeseHacks 2022 Discord server to catch up on the latest updates: <Alert.Link href='https://discord.gg/sHWBYKsakg'>https://discord.gg/sHWBYKsakg</Alert.Link></p>
          </Alert>
        )}
        <Row>
          <Col lg="6" className="d-flex flex-row my-3">
            {!props.user.team ? (
              <Card className="shadow">
                <Card.Body>
                  <Card.Title>Team Management</Card.Title>
                  <p>
                    You have not yet joined a team. You do not need to join a
                    team before the hackathon, but we will help you form into
                    teams of 2-4 people at the start if you have not joined one
                    in advance.
                  </p>
                  <Container>
                    <Row>
                      <Col sm="6" className="my-3">
                        <Card className="shadow" style={{ height: "100%" }}>
                          <Card.Img
                            height="150px"
                            style={{ objectFit: "cover" }}
                            varaint="top"
                            src="/api/files/create-team.jpg"
                          ></Card.Img>
                          <Card.Body className="d-flex flex-column">
                            <Card.Title>Create Team</Card.Title>
                            <Card.Text>
                              Create a new team and have friends join you in the
                              hackathon. You do not have to know who else will
                              be in your team when making the team.
                            </Card.Text>
                            {props.user && props.user.registered ? (
                              <Button
                                variant="primary"
                                className="mt-auto"
                                onClick={() => setShowNewTeamModal(true)}
                              >
                                Create Team
                              </Button>
                            ) : (
                              <OverlayTrigger
                                placement="top"
                                overlay={
                                  <Tooltip>
                                    You must register before creating a team
                                  </Tooltip>
                                }
                              >
                                <Button variant="primary" className="mt-auto">
                                  Create Team
                                </Button>
                              </OverlayTrigger>
                            )}
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col sm="6" className="my-3">
                        <Card className="shadow" style={{ height: "100%" }}>
                          <Card.Img
                            height="150px"
                            style={{ objectFit: "cover" }}
                            varaint="top"
                            src="/api/files/join-team.jpg"
                          ></Card.Img>
                          <Card.Body className="d-flex flex-column">
                            <Card.Title>Join Team</Card.Title>
                            <Card.Text>
                              Browse existing teams to see if anything interests
                              you, or if you are looking to join a friend's
                              team.
                            </Card.Text>
                            <Button
                              href="/teams"
                              variant="primary"
                              className="mt-auto"
                            >
                              Browse Teams
                            </Button>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  </Container>
                </Card.Body>
              </Card>
            ) : (
              <Card>
                <Card.Img
                  src={"/api/files/join-team.jpg"}
                  style={{ maxHeight: "300px" }}
                ></Card.Img>
                <Card.Body>
                  <Card.Title>Team Management</Card.Title>
                  <p>
                    You are currently a team member of{" "}
                    <strong>
                      {myTeam ? (
                        <a href={`/teams/${myTeam.id}`}>{myTeam.name}</a>
                      ) : (
                        "..."
                      )}
                    </strong>
                    ! You can <a href="/teams">manage your team membership</a>{" "}
                    if you would like to leave or join a different team.
                  </p>
                </Card.Body>
              </Card>
            )}
          </Col>
          <Col lg="6" className="my-3">
            <Card>
              <Card.Body>
                <Card.Title>Registration</Card.Title>
                <p>
                  Thank you for your interest in CheeseHacks 2022! We are
                  excited and prepared to have more hackers this year than ever
                  before. However, we will need some additional information
                  about you in order to make everything run smoothly.
                </p>

                {props.user &&
                  !props.user.registered &&
                  countUsers &&
                  countUsers < 150 && (
                    <Button
                      variant="dark"
                      onClick={() => {
                        setShowRegistrationModal(true);
                      }}
                    >
                      Register
                    </Button>
                  )}
                {props.user &&
                  !props.user.registered &&
                  countUsers > 149 &&
                  !props.user.team && (
                    <Alert>
                      <Alert.Heading>Registration Closed</Alert.Heading>There
                      are no more spots available for CheeseHacks this year. If
                      you have any questions or concerns, contact{" "}
                      <Alert.Link href="mailto:rswerner@wisc.edu">
                        rswerner@wisc.edu
                      </Alert.Link>{" "}
                      for assistance
                    </Alert>
                  )}
                {props.user &&
                  !props.user.registered &&
                  countUsers > 149 &&
                  props.user.team && (
                    <Alert variant='danger'>
                      <Alert.Heading >Action Needed: Registration Error</Alert.Heading>There is
                      an error in your registration. You have signed up for a
                      team without registering to attend the event. As this was
                      mainly an error on our part, we can try and accomodate you
                      to the best of our ability. Please contact{" "}
                      <Alert.Link href="mailto:rswerner@wisc.edu">
                        rswerner@wisc.edu
                      </Alert.Link>{" "}
                      as soon as possible to correct your registration.
                      <hr />
                      Failure to correct this error in advance of the hackathon will forfeit your seat.
                    </Alert>
                  )}

                {props.user && props.user.registered && (
                  <p style={{ color: "green" }}>
                    Registration Completed. Thank you!
                  </p>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Registration
          user={props.user}
          show={showRegistrationModal}
          onClose={() => {
            setShowRegistrationModal(false);
          }}
          setUser={props.setUser}
        />
        <NewTeamModal
          show={showNewTeamModal}
          onHide={() => {
            setShowNewTeamModal(false);
          }}
          user={props.user}
          setUser={props.setUser}
        />
      </Container>
    );
  } else {
    return (
      <Container>
        <Row>
          <Col className="text-center my-5">
            <Spinner animation="border" />
            {awhile ? (
              <p className="text-muted">
                If this is taking a long time, make sure that you are{" "}
                <a href="/login">signed in</a>
              </p>
            ) : (
              <></>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}
