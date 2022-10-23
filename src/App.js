import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Accordion } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./Navigation/Navigation";
import Home from "./Home/Home"
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`/api/user-utility/self`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          setUser(false);
        }
      })
      .then((res) => {
        setUser(res[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const containerStyle = {
    width: "100%",
    height: "400px",
  };


  const center = {
    lat: 43.0719874,
    lng: -89.4032545,
  };

  const edsci = {
    
  }

  return (
    <div>
      <Navigation user={user} />
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
        <Row>
          <Col>
            <h1 className="text-center m-5">Judging</h1>
          </Col>
        </Row>
        <Row className="px-5">
          <Col lg="3" className="mb-3">
            <Card className="shadow" style={{ height: "100%" }}>
              <Card.Img
                height="250px"
                style={{ objectFit: "cover" }}
                varaint="top"
                src="/api/files/innovation.jpg"
              ></Card.Img>
              <Card.Body>
                <Card.Title>Innovation</Card.Title>
                <Card.Text>
                  Build a project that expands on the technologies that are
                  available to you. We want to see you build something that
                  fulfills a technological need, or brings together technologies
                  that have never been used together. Whether it's using cameras
                  on your computer to play pong, or solving multivariable
                  calculus, it doesn't need to be beautiful to be cool.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg="3" className="mb-3">
            <Card className="shadow" style={{ height: "100%" }}>
              <Card.Img
                height="250px"
                style={{ objectFit: "cover" }}
                varaint="top"
                src="/api/files/style.jpg"
              ></Card.Img>
              <Card.Body>
                <Card.Title>Style</Card.Title>
                <Card.Text>
                  Who cares what the website does - as long as it's pretty! We
                  want to see a beautiful user interface full of satisfying
                  buttons and features that make the application feel complete.
                  "Design is not just what it looks like and feels like. Design
                  is how it works." -Steve Jobs
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg="3" className="mb-3">
            <Card className="shadow" style={{ height: "100%" }}>
              <Card.Img
                height="250px"
                style={{ objectFit: "cover" }}
                varaint="top"
                src="/api/files/creativity.jpg"
              ></Card.Img>
              <Card.Body>
                <Card.Title>Creativity</Card.Title>
                <Card.Text>
                  Think outside of the box! Use your imagination to make your
                  application different than anything else that exists. Explore
                  new ideas and tackle the unknown - we gaurantee that you'll be
                  rewarded!
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg="3" className="mb-3">
            <Card className="shadow" style={{ height: "100%" }}>
              <Card.Img
                height="250px"
                style={{ objectFit: "cover" }}
                varaint="top"
                src="/api/files/viability.jpg"
              ></Card.Img>
              <Card.Body>
                <Card.Title>Viability</Card.Title>
                <Card.Text>
                  After all is said and done - have you built something that
                  would work out in the wild? Create an application that people
                  would want to use outside of a competition. Who knows, maybe
                  this could be the start of your own business (or a good
                  example to put in your professional portfolio)!
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="m-5">
          <Col lg="4"></Col>
          <Col lg="4">
            <Card className="shadow m-auto">
              <Card.Body>
                <Row>
                  <Col>
                    <h1 className="text-center">Hackathon Registration</h1>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <p className="text-center">
                      Sign up before all seats are taken!
                    </p>
                  </Col>
                </Row>
                <Row className="text-center">
                  <Col>
                    <h4 className="m-3">25/293 enrolled</h4>
                  </Col>
                  <Col>
                    <h4 className="m-3">3 teams</h4>
                  </Col>
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
          <Col lg="4"></Col>
        </Row>
        <Row className="px-5">
          <Col lg="6">
            <Card className="my-5 shadow">
              <Card.Body>
                <Card.Title>
                  <h1>FAQs</h1>
                </Card.Title>
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
                  <Accordion.Item eventKey="1.5">
                    <Accordion.Header>I'm a Freshman, can I attend?</Accordion.Header>
                    <Accordion.Body>For sure! Regardless of experience, you are welcome to come and hack! It's a great opportunity to build your personal professional portfolio</Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="2">
                    <Accordion.Header>
                      Is there any cost to attend?
                    </Accordion.Header>
                    <Accordion.Body>
                      No! The hackathon is graciously supported by our corporate
                      sponsors. Additionally, we will provide free catered food
                      on the night of the 12th.
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
                      The hackathon will occur at Educational Sciences Room 204,{" "}
                      <a href="https://map.wisc.edu/s/20807nlk">
                        1025 W. Johnson St, Madison, WI 53715
                      </a>
                      . We have reserved additional rooms in the building for
                      use during the hackathon.
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Card.Body>
            </Card>
          </Col>
          <Col lg="6">
            <Card className='my-5'>
              <Card.Body>
                <LoadScript googleMapsApiKey="AIzaSyClFNuBjB5lqtqPWEku0Go7Y_uSVwTfvEE">
                  
                  <GoogleMap
                   
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={15}
                  ><Marker position={center} title="CheeseHacks 2022"></Marker></GoogleMap>
                </LoadScript>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="px-5">
          <Col>
            <h1 className="text-center">Sponsors</h1>
            <div className='d-flex justify-content-center mb-5'>
            <img style={{width: '75%'}} className='mt-5' src='/api/files/compsci.png'></img>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
