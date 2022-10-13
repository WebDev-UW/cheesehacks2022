import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./Navigation";

export default function App() {
  return (
    <div>
      <Navigation />
      <Container>
        <Row>
          <Col>Cheesehacks</Col>
        </Row>
      </Container>
    </div>
  );
}
