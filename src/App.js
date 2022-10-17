import React from "react";
import { Container, Row, Col, Card, Button, Accordion } from "react-bootstrap";
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
            minHeight: "115vh",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <Col lg="6">
            <div
              className="m-5 p-3 shadow"
              style={{ backgroundColor: "white" }}
            >
              <Container>
                <Row>
                  <Col>
                    <img
                      src="/api/files/CheeseHacks.jpg"
                      width="100%"
                      alt="CheeseHacks 2022"
                    ></img>
                  </Col>
                </Row>
                <Row>
                  <Col className="d-flex justify-content-center">
                    <h3>11.12.22 - 11.13.22</h3>
                  </Col>
                </Row>
                <Row>
                  <Col className="d-flex justify-content-center">
                    <Button variant="dark" className="mt-3">
                      Register
                    </Button>
                  </Col>
                </Row>
              </Container>
            </div>
          </Col>
          <Col lg="6"></Col>
        </Row>
        <Row>
          <Col lg="12">
            <div
              className="mx-5 mb-5 p-3 shadow text-center"
              style={{
                backgroundColor: "white",
                marginTop: "-15vh",
                minHeight: "30vh",
              }}
            >
              <h1>About</h1>
              <p className="m-4" style={{ fontSize: "1.3rem" }}>
                CheeseHacks is a 24-hour hackathon that takes place over a fall
                weekend on the UW-Madison Campus. We bring together students
                interested in designing software such as web or mobile
                applications, but you can work on any technology project you can
                think of! We encourage you to work together with a team to
                compete for prizes and awards from our sponsors.
              </p>
              <p className="m-4" style={{ fontSize: "1.3rem" }}>
                This year, CheeseHacks will be fully in-person at the
                Educational Sciences Building.
              </p>
            </div>
          </Col>
        </Row>
        <Row className="px-5">
          <Col lg="3">
            <Card className="mb-3 shadow">
              <Card.Img
                varaint="top"
                src="/api/files/cheesehacks_main.jpg"
              ></Card.Img>
              <Card.Body>
                <Card.Title>Track 1</Card.Title>
                <Card.Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg="3">
            <Card className="mb-3 shadow">
              <Card.Img
                varaint="top"
                src="/api/files/cheesehacks_main.jpg"
              ></Card.Img>
              <Card.Body>
                <Card.Title>Track 2</Card.Title>
                <Card.Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg="3">
            <Card className="mb-3 shadow">
              <Card.Img
                varaint="top"
                src="/api/files/cheesehacks_main.jpg"
              ></Card.Img>
              <Card.Body>
                <Card.Title>Track 3</Card.Title>
                <Card.Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg="3">
            <Card className="mb-3 shadow">
              <Card.Img
                varaint="top"
                src="/api/files/cheesehacks_main.jpg"
              ></Card.Img>
              <Card.Body>
                <Card.Title>Track 4</Card.Title>
                <Card.Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className='m-5'>
          <Col lg='4'></Col>
          <Col lg='4'>
              <Card className='shadow m-auto'>
                <Card.Body>
                  <Row>
                    <Col><h1 className='text-center'>Hackathon Registration</h1></Col>
                  </Row>
                  <Row className='text-center'>
                    <Col><h4 className='m-5'>25/293 enrolled</h4></Col>
                    <Col><h4 className='m-5'>3 teams</h4></Col>
                  </Row>
                  <Row>
                  <Col className="d-flex justify-content-center">
                    <Button variant="dark" className="mt-3">
                      Register
                    </Button>
                  </Col>
                  </Row>
                </Card.Body>
              </Card>
          </Col>
          <Col lg='4'></Col>
        </Row>
        <Row className="px-5">
          <Col lg="6">
            <Card className="my-5 shadow">
              <Card.Body>
                <Card.Title><h1>FAQs</h1></Card.Title>
                <Accordion flush>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>What is a Hackathon?</Accordion.Header>
                    <Accordion.Body>
                      A hackathon is an event where students come together to
                      work on software projects
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>How do I attend?</Accordion.Header>
                    <Accordion.Body>
                      Register on this website to save your seat. Then, browse
                      or create a team for the hackathon. And most importantly,
                      show up on the day of the hackathon with your laptop!
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="2">
                    <Accordion.Header>
                      Is there any cost to attend?
                    </Accordion.Header>
                    <Accordion.Body>
                      No! The hackathon is graciously supported by our corporate
                      sponsors. Additionally, we will provide free catered food on the night of the 12th.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="3">
                    <Accordion.Header>
                      What kind of projects can I build?
                    </Accordion.Header>
                    <Accordion.Body>
                      You can work on anything! Whether it is built in Java,
                      JavaScript, C++, C#, or any other language, you will fit
                      right in. Any experience level is welcome to participtate.
                      We judge based on different factors, such as the user
                      interface of the end-product, to the technical complexity
                      of the product created.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="4">
                    <Accordion.Header>
                      When and where is the hackathon?
                    </Accordion.Header>
                    <Accordion.Body>
                      The hackathon is planned for Saturday, November 12th at
                      noon to Sunday, November 13th at noon. After the hackathon
                      ends, judging will be performed and you may be asked to
                      give a presentation to win awards or prizes.
                      <br />
                      <br />
                      The hackathon will occur at Educational Sciences Room 204, <a href='https://map.wisc.edu/s/20807nlk'>1025 W. Johnson St, Madison, WI 53715</a>. We have reserved additional rooms in the building for use during the hackathon.
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Card.Body>
            </Card>
          </Col>
          <Col lg="6"></Col>
        </Row>
        <Row className="px-5">
          <Col>
            <h1 className="text-center">Sponsors</h1>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
