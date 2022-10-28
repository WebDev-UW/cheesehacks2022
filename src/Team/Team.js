import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  Placeholder,
  Row,
  Spinner,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import NotFound from "../NotFound";
import DisbandModal from "./DisbandModal";
import RemoveModal from "./RemoveModal";

function loadUser(id) {
  return new Promise((resolve, reject) => {
    fetch(`/api/user-utility/user/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        return res.ok ? res.json() : new Error("An unexpected error occurred");
      })
      .then((res) => {
        resolve(res[0]);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function removeUser(team_id, user_id, setAsOf) {
  fetch(`/api/team-utility/link/${team_id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: user_id }),
  })
    .then((res) => {
      return res.ok
        ? setAsOf(new Date())
        : new Error("An unexpected error occurred while removing user");
    })
    .catch((err) => {
      console.log(err);
    });
}

function leaveTeam(setAsOf, user, setUser) {
  fetch("/api/team-utility/link", {
    method: "DELETE",
  })
    .then((res) => {
        if (res.ok) {
            
            const userCopy = JSON.parse(JSON.stringify(user))
            userCopy.team = null
            setUser(userCopy)
            setAsOf(new Date())
          } else {
            throw new Error("An unexpected error occurred");
          }
    })
    .catch((err) => {
      console.log(err);
      setAsOf(new Date());
    });
}

function joinTeam(teamId, setAsOf, user, setUser) {
  fetch(`/api/team-utility/link/${teamId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => {
      if (res.ok) {
        
        const userCopy = JSON.parse(JSON.stringify(user))
        userCopy.team = parseInt(teamId)
        setUser(userCopy)
        setAsOf(new Date())
      } else {
        throw new Error("An unexpected error occurred");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function disbandTeam(teamId, setAsOf, user, setUser, navigate) {
  fetch(`/api/team-utility/team/${teamId}`, {
    method: "DELETE",
  })
  .then(res => {
    if (res.ok) {
      const userCopy = JSON.parse(JSON.stringify(user))
        userCopy.team = null
        setUser(userCopy)
        navigate('/teams')
    } else {
      throw new Error('An unexpected error occurred')
    }
  })
  .catch(err => {
    console.log(err)
  })
}

function renderMember(member, asCaptain, user, setShowRemoveModal) {
  return (
    <ListGroup.Item
      key={member.id}
      className="d-flex flex-row align-items-center"
    >
      <div style={{ marginRight: "1rem" }}>
        <img
          style={{ height: "35px" }}
          className="rounded-circle"
          src={member.profile_picture_url}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src=`/api/files/favicon.ico`;
          }}
        ></img>
      </div>
      <div className="d-flex flex-column">
        <div>
          {member.first_name} {member.last_name}
        </div>
        <div className="text-muted">{member.email}</div>
      </div>
      {asCaptain && member.id !== user.id ? (
        <Button
          onClick={() => setShowRemoveModal(member.id)}
          style={{ marginLeft: "auto" }}
          size="sm"
          variant="danger"
        >
          x
        </Button>
      ) : (
        <></>
      )}
    </ListGroup.Item>
  );
}

export default function Team(props) {
  const params = useParams();
  const [teamInfo, setTeamInfo] = useState(null);
  const [teamCaptain, setTeamCaptain] = useState(null);
  const [members, setMembers] = useState(null);
  const [asCaptain, setAsCaptain] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showDisbandModal, setShowDisbandModal] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false);
  const [asOf, setAsOf] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    setMembers(null)
    if (
      teamInfo &&
      teamInfo[0] &&
      teamInfo[0].user_ids &&
      teamInfo[0].user_ids.split(",").length > 0
    ) {
      const ids = teamInfo[0].user_ids.split(",");
      const promises = ids.map((id) => loadUser(id));
      Promise.all(promises).then((data) => {
        setMembers(data);
      });
    } else {
        setMembers([])
    }
  }, [teamInfo]);

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
  }, [params.id, asOf]);

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
    //console.log(props.user);
    //console.log(teamCaptain);
    if (props.user && teamCaptain) {
      if (props.user.id === teamCaptain.id) {
        setAsCaptain(true);
      }
    }
  }, [props, teamCaptain]);

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
                onLoad={() => {
                  setImageLoaded(true);
                }}
              />
              {!imageLoaded ? (
                <Placeholder style={{ height: "300px" }} xs="12" />
              ) : (
                <></>
              )}
              <Button
                style={{ position: "absolute", top: "2%", left: "2%" }}
                variant="dark"
                onClick={() => navigate("/teams")}
              >
                {" "}
                {"<-"} All Teams
              </Button>
              <Card.Body>
                <Card.Title>{teamInfo[0].name}</Card.Title>
                <p>{teamInfo[0].description}</p>
                {props.user && !props.user.team && teamInfo[0].user_ids.split(',').length < 4 && (
                  <Button onClick={() => joinTeam(params.id, setAsOf, props.user, props.setUser)}>
                    Join Team
                  </Button>
                )}
                {props.user && props.user.team === parseInt(params.id) && (
                  <Button
                    variant="outline-danger"
                    onClick={() => {
                      leaveTeam(setAsOf, props.user, props.setUser);
                    }}
                    disabled={teamInfo[0] && parseInt(props.user.id) === teamInfo[0].team_captain}
                  >
                    Leave Team
                  </Button>
                )}
                <p className="text-muted my-3">
                  Judging information, such as submitting your completed hack,
                  and the time of your presentation will appear on this page
                  once the hackathon begins.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md="4">
            <Card className="my-3 shadow">
              <Card.Body>
                <Card.Title>Team Captain</Card.Title>
                <ListGroup variant="flush">
                  {teamCaptain ? (
                    renderMember(teamCaptain)
                  ) : (
                    <Spinner className="m-auto my-3" animation="border" />
                  )}
                </ListGroup>
                <p>
                  The Team captain reserves the right to remove any members of
                  their team as they see fit
                </p>
                {props.user && parseInt(teamInfo[0].team_captain) === props.user.id ? <div className='d-flex'><Button style={{margin: 'auto'}} variant='outline-danger' onClick={() => {setShowDisbandModal(true)}}>Disband Team</Button></div> : <></>}
              </Card.Body>
            </Card>
            <Card className="my-3 shadow">
              <Card.Body>
                <Card.Title>
                  Members{" "}
                  {members && <Badge variant="dark">{members.length} / 4</Badge>}
                </Card.Title>
                <ListGroup variant="flush">
                  {members && members.length > 0 ? (
                    members.map((member) =>
                      renderMember(
                        member,
                        asCaptain,
                        props.user,
                        setShowRemoveModal
                      )
                    )
                  ) : (
                    <></>
                  )}
                  {members && members.length === 0 ? (
                    <p className="text-muted">No members</p>
                  ) : (
                    <></>
                  )}
                  {!members && <Spinner className="m-auto my-3" animation="border" />}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <RemoveModal
          show={showRemoveModal}
          onHide={(e) => {
            setShowRemoveModal(false);
          }}
          remove={() => {
            removeUser(params.id, showRemoveModal, setAsOf);
            setShowRemoveModal(false);
          }}
        />
        <DisbandModal show={showDisbandModal} onHide={() => setShowDisbandModal(false)} confirm={() => {disbandTeam(params.id, setAsOf, props.user, props.setUser, navigate); setShowDisbandModal(false)}} />
      </Container>
    );
  }
}
