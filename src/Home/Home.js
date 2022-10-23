import React from 'react';
import { Row, Col, Card, Button } from "react-bootstrap";

export default function Home() {
  return (
    
    <Row className="px-5">
    <Col lg="3" className="mb-3">
    <Card className="shadow" style={{ height: "100%" }}>
    <Card.Img
      height="250px"
      style={{ objectFit: "cover" }}
      varaint="top"
      src="/api/files/create-team.jpg"
    ></Card.Img>
    <Card.Body className='d-flex flex-column'>
      <Card.Title>Create Team</Card.Title>
      <Card.Text>
        This is for you if you want to create a new team. You don't have to have three members to create a team, you may create a team with just two members and add another later.
      </Card.Text>
      <Button variant="primary" className='mt-auto'>Create Team</Button>
    </Card.Body>
  </Card>
  </Col>
  <Col lg="3" className="mb-3">
  <Card className="shadow" style={{ height: "100%" }}>
    <Card.Img
      height="250px"
      style={{ objectFit: "cover" }}
      varaint="top"
      src="/api/files/join-team.jpg"
    ></Card.Img>
    <Card.Body className='d-flex flex-column'>
      <Card.Title>Join Team</Card.Title>
      <Card.Text>
        This is for you if you want to join an already created team.
      </Card.Text>
      <Button variant="primary" className='mt-auto'>Join Team</Button>
    </Card.Body>
  </Card>
  </Col>
  </Row>
  )
}