import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./Navigation";

export default function App() {
  return (
    <div>
      <Navigation />
      <Container fluid>
        <Row
          style={{
            backgroundImage: 'url("/api/files/cheesehacks_main.jpg")',
            minHeight: "100vh",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <Col lg="6">
            <div className="m-5 p-3 shadow" style={{ backgroundColor: "white" }}>
              <Container>
                <Row>
                  <Col>
                  <img src='/api/files/CheeseHacks.jpg' width='100%' alt='CheeseHacks 2022'></img>
                  </Col>
                </Row>
                <Row>
                  <Col className='d-flex justify-content-center'>
                  <h3>11.12.22 - 11.13.22</h3>
                  </Col>
                </Row>
                
              </Container>
            </div>
          </Col>
          <Col lg="6"></Col>
        </Row>
        <Row>
          <Col>
            <div className='mx-5 mb-5 p-3 shadow' style={{backgroundColor: 'white', marginTop: '-5rem', height: '50vh'}}></div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
