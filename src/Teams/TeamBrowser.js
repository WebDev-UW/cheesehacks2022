import React, { useEffect, useState } from "react";
import {
  Card,
  Container,
  ListGroup,
  Spinner,
  Row,
  Col,
  Alert,
  Button,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NewTeamModal from "./NewTeamModal";

export default function TeamBrowser(props) {
  const [teams, setTeams] = useState(null);
  const [showNewTeamModal, setShowNewTeamModal] = useState(false)
  const navigate = useNavigate()

  function renderTeams() {
    if (teams && teams.length > 0) {
      return teams.map((team) => {
        return (
          <ListGroup.Item key={team.id} action onClick={() => {navigate(`/teams/${team.id}`)}}>
            <div className='d-flex justify-content-between align-items-center'>
            <div className='d-flex flex-column'>
            <h4>{team.name}</h4>
            {team.description}
            </div>
            <div>{team.user_ids ? team.user_ids.split(',').length : '0'} / 4 members</div>
            </div>
          </ListGroup.Item>
        );
      });
    } else {
      return (
        <ListGroup.Item>
          <Spinner animation="border"></Spinner>
        </ListGroup.Item>
      );
    }
  }

  useEffect(() => {
    fetch("/api/team-utility/team", {
      method: "GET",
    })
      .then((res) => {
        return res.ok
          ? res.json()
          : () => {
              throw new Error("An unexpected error occurred");
            };
      })
      .then((res) => {
        setTeams(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <Card className="shadow my-3">
            <Card.Header>
              <Card.Title>Teams</Card.Title>
            </Card.Header>
            <Card.Body>
              {props.user && !props.user.team && (
                <Alert variant="danger">
                  <Alert.Heading>No Team Enrollment</Alert.Heading>
                  <p>
                    You are not currently a member on any team. Use this page to
                    join a team before the hackathon, otherwise, wait until the
                    day of the hackathon and we can help you find a team.
                  </p>
                </Alert>
              )} {props.user && props.user.team && (
                <Alert variant="success">
                  <Alert.Heading>Team Enrollment Complete</Alert.Heading>
                  <p>
                    You are currently listed as a member of a team. No further
                    action is required at this time.
                  </p>
                </Alert>
              )}
              {props.user && !props.user.team && <div className='d-flex'><Button variant='dark' style={{marginLeft: 'auto'}} className='my-3' onClick={() => {setShowNewTeamModal(true)}}>Create New Team</Button></div>}
              <h5 className='text-center'>All Teams</h5>
              <ListGroup variant="flush">{renderTeams()}</ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <NewTeamModal show={showNewTeamModal} onHide={() => {setShowNewTeamModal(false)}} user={props.user} setUser={props.setUser} />
    </Container>
  );
}
