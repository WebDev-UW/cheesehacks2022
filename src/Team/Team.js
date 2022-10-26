import React, { useEffect, useState } from "react";
import { Card, Col, Container, ListGroup, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import NotFound from "../NotFound";

export default function Team(props) {
  const params = useParams();
  const [teamInfo, setTeamInfo] = useState(null);
  const [teamCaptain, setTeamCaptain] = useState(null);

  useEffect(() => {
    fetch(`/api/team-utility/team/${params.id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        return res.ok ? res.json() : new Error("An unexpected error occurred");
      })
      .then((res) => {
        setTeamInfo(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.id]);

  useEffect(() => {
    if (teamInfo && teamInfo[0]) {
      fetch(`/api/user-utility/user/${teamInfo[0].team_captain}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          return res.ok
            ? res.json()
            : new Error(
                "An unexpected error occurred while loading team captain"
              );
        })
        .then((res) => {
          setTeamCaptain(res[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [teamInfo]);

  if (teamInfo === null) {
    return (
      <Container>
        <Row>
          <Col>
            <Spinner className="my-5" animation="border" />
          </Col>
        </Row>
      </Container>
    );
  } else if (teamInfo.length === 0) {
    return <NotFound />;
  } else {
    return (
      <Container>
        <Row>
          <Col md="8">
            <Card className="my-3 shadow">
              <Card.Img
                style={{ maxHeight: "300px", objectFit: "cover" }}
                src="/api/files/join-team.jpg"
              />
              <Card.Body>
                <Card.Title>{teamInfo[0].name}</Card.Title>
                {teamInfo[0].description}
              </Card.Body>
            </Card>
          </Col>
          <Col md="4">
            <Card className="my-3 shadow">
              <Card.Body>
                <Card.Title>Team Captain</Card.Title>
                <ListGroup variant="flush">
                  {teamCaptain && (
                    <ListGroup.Item className="d-flex flex-row align-items-center">
                      <div style={{marginRight: '1rem'}}>
                        <img
                          style={{ height: "35px" }}
                          className="rounded-circle"
                          src={teamCaptain.profile_picture_url}
                        ></img>
                      </div>
                      <div className='d-flex flex-column'><div>{teamCaptain.first_name} {teamCaptain.last_name}</div><div className='text-muted'>{teamCaptain.email}</div></div>
                    </ListGroup.Item>
                  )}
                </ListGroup>
                <p>
                  The Team captain reserves the right to remove any members of
                  their team as they see fit
                </p>
              </Card.Body>
            </Card>
            <Card className="my-3 shadow">
              <Card.Body>
                <Card.Title>Members</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}
