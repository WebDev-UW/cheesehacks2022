import React, { useEffect, useState } from "react";
import { Badge, Button, Card, Col, Container, ListGroup, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import NotFound from "../NotFound";
import RemoveModal from "./RemoveModal";

function loadUser(id) {
    return new Promise((resolve, reject) => {
        fetch(`/api/user-utility/user/${id}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => {
            return res.ok ? res.json() : new Error('An unexpected error occurred')
        })
        .then(res => {
            resolve(res[0])
        })
        .catch(err => {
            reject(err)
        })
    })
}

function renderMember(member, asCaptain, user, setShowRemoveModal) {
    return <ListGroup.Item key={member.id} className="d-flex flex-row align-items-center">
    <div style={{marginRight: '1rem'}}>
      <img
        style={{ height: "35px" }}
        className="rounded-circle"
        src={member.profile_picture_url}
      ></img>
    </div>
    <div className='d-flex flex-column'><div>{member.first_name} {member.last_name}</div><div className='text-muted'>{member.email}</div></div>
    {asCaptain && member.id !== user.id ? <Button onClick={() => setShowRemoveModal(member.id)} style={{marginLeft: 'auto'}} size='sm' variant='danger'>x</Button> : <></>}
  </ListGroup.Item>
}

export default function Team(props) {
  const params = useParams();
  const [teamInfo, setTeamInfo] = useState(null);
  const [teamCaptain, setTeamCaptain] = useState(null);
  const [members, setMembers] = useState(null);
  const [asCaptain, setAsCaptain] = useState(false)
  const [showRemoveModal, setShowRemoveModal] = useState(false)

  useEffect(() => {
    if (teamInfo && teamInfo[0].user_ids && teamInfo[0].user_ids.split(',').length > 0) {
        const ids = teamInfo[0].user_ids.split(',')
        const promises = ids.map(id => loadUser(id))
        Promise.all(promises)
        .then(data => {
            setMembers(data)
        })
    }
  }, [teamInfo])

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

  useEffect(() => {
    console.log(props.user)
    console.log(teamCaptain)
    if (props.user && teamCaptain) {
        if (props.user.id === teamCaptain.id) {
            setAsCaptain(true)
        }
    }
  }, [props, teamCaptain])

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
                <p>{teamInfo[0].description}</p>
                <p className='text-muted'>Judging information, such as submitting your completed hack, and the time of your presentation will appear on this page once the hackathon begins.</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md="4">
            <Card className="my-3 shadow">
              <Card.Body>
                <Card.Title>Team Captain</Card.Title>
                <ListGroup variant="flush">
                  {teamCaptain ?
                    renderMember(teamCaptain)
                    : <Spinner className='m-auto my-3' animation='border' />
                  }
                </ListGroup>
                <p>
                  The Team captain reserves the right to remove any members of
                  their team as they see fit
                </p>
              </Card.Body>
            </Card>
            <Card className="my-3 shadow">
              <Card.Body>
                <Card.Title>Members {members && <Badge variant='dark'>{members.length}</Badge>}</Card.Title>
                <ListGroup variant='flush'>
                  {members && members.length > 0 ? members.map(member => renderMember(member, asCaptain, props.user, setShowRemoveModal)) : <Spinner className='m-auto my-3' animation='border' />}
                  {members && members.length === 0 ? <p className='text-muted'>No members</p> : <></>}
                  </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <RemoveModal show={showRemoveModal} onHide={e => {setShowRemoveModal(false)}} />
      </Container>
    );
  }
}
