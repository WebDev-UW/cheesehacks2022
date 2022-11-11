import React, { useState, useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

export default function CheckinDash(props) {

  const [users, setUsers] = useState([]);
  const [asOf, setAsOf] = useState(new Date())

  useEffect(() => {
    setTimeout(() => {setAsOf(new Date())}, 10000)
  }, [asOf])

  useEffect(() => {
    fetch("/api/user-utility/user?expanded=1", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        return res.ok ? res.json() : new Error("An unexpected error occurred");
      })
      .then((res) => {
        setUsers(res);
      })
      .catch((err) => {
        res.status(500).json({ err: err });
      });
  }, [asOf]);

  return (
    <Container fluid>
      <Row className='my-2'>
        <Col className='flex-grow'>
          <Card className='m-1 text-center' style={{height: '100%'}}>
            <Card.Body className='d-flex flex-column justify-content-center align-items-center'>
              <h2>Welcome!</h2>
              <p>Please check in.</p>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className='m-1 text-center' style={{height: '100%'}}>
            <Card.Body>
              <img src="/api/files/CheeseHacks.jpg" width="100%"></img>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className='m-1 text-center' style={{height: '100%'}}>
            <Card.Body className='d-flex align-items-center'>
              All participants should join teams of 2-4 people. If you have not joined a team, there will be a team forming event right after we start.
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        {users &&
          users.filter(user => user.checkedin_by_id).length > 0 &&
          users.filter(user => user.checkedin_by_id).map((user) => (
            <Col>
              <Card className="m-1">
                <Card.Body className="p-1" style={{ whiteSpace: "nowrap" }}>
                  <div className="d-flex flex-column text-center">
                    <img
                      src={user.profile_picture_url}
                      width="50px"
                      className="m-auto"
                    ></img>
                    {`${user.first_name} ${user.last_name}`}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
}
