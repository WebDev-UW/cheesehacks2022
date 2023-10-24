import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Accordion,
  Spinner,
} from "react-bootstrap";
import Navigation from "../Navigation/Navigation";
import Faqs from "./Faqs";

export default function External(props) {
  const [countUsers, setCountUsers] = useState(null);
  const [countTeams, setCountTeams] = useState(null);

  useEffect(() => {
    fetch("/api/user-utility/stats?registered=1", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        return res.ok
          ? res.json()
          : new Error(
              "An unexpected error occurred while loading the number of users enrolled"
            );
      })
      .then((data) => {
        setCountUsers(data[0].count_of_users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    fetch("/api/team-utility/stats", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        return res.ok
          ? res.json()
          : new Error(
              "An unexpected error occurred while loading the number of teams"
            );
      })
      .then((data) => {
        setCountTeams(data[0].count_of_teams);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const center = {
    lat: 43.0719874,
    lng: -89.4032545,
  };

  return (
    <div>
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
                      alt="CheeseHacks 2023"
                    ></img>
                  </Col>
                </Row>
                <Row>
                  <Col className="d-flex justify-content-center">
                    <h3>11.04.23 - 11.05.23</h3>
                  </Col>
                </Row>
                <Row>
                  <Col className="d-flex justify-content-center">
                    {countUsers && countUsers < 150 ? (
                      <Button variant="dark" className="mt-3" href="/home">
                        Register
                      </Button>
                    ) : (
                      <div className="d-flex flex-column">
                        <div className="m-auto">
                          <Button variant="dark" className="mt-3" disabled>
                            Register
                          </Button>
                        </div>
                        <p className="text-muted">
                          Registration Closed: All seats are full!
                        </p>
                      </div>
                    )}
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
              <h1 id="about">About</h1>
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
                    {countUsers ? (
                      <h4 className="m-3">{countUsers}/150 registered</h4>
                    ) : (
                      <Spinner animation="border" />
                    )}
                  </Col>
                  <Col>
                    {countUsers ? (
                      <h4 className="m-3">
                        {countTeams} team{countTeams == 1 ? "" : "s"}
                      </h4>
                    ) : (
                      <Spinner animation="border" />
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col className="d-flex justify-content-center">
                  {countUsers && countUsers < 150 ? (
                      <Button variant="dark" className="mt-3" href="/home">
                        Register
                      </Button>
                    ) : (
                      <div className="d-flex flex-column">
                        <div className="m-auto">
                          <Button variant="dark" className="mt-3" disabled>
                            Register
                          </Button>
                        </div>
                        <p className="text-muted">
                          Registration Closed: All seats are full!
                        </p>
                      </div>
                    )}
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
                <Faqs />
              </Card.Body>
            </Card>
          </Col>
          <Col lg="6" className="d-flex">
            <Card
              className="my-5"
              style={{ flexGrow: "1", minHeight: "500px" }}
            >
              <Card.Body>
                <LoadScript googleMapsApiKey="AIzaSyClFNuBjB5lqtqPWEku0Go7Y_uSVwTfvEE">
                  <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={15}
                  >
                    <Marker position={center} title="CheeseHacks 2023"></Marker>
                  </GoogleMap>
                </LoadScript>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="px-5">
          <Col>
            <h1 className="text-center" id="sponsors">
              Sponsors
            </h1>
            <Container>
              <Row className="align-items-center">
                <Col xl="4">
                  <img
                    style={{ width: "100%" }}
                    className="my-3"
                    src="/api/files/compsci.png"
                  ></img>
                </Col>
                <Col xl="4">
                  <img
                    style={{ width: "100%" }}
                    className="my-3"
                    src="/api/files/Google.png"
                  />
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
