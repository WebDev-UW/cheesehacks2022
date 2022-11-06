import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, ListGroup, Form, Button, Alert } from "react-bootstrap";
import Fuse from "fuse.js";

export default function CheckIn(props) {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetch("/api/user-utility/user", {
      method: "GET",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("An error occurred while loading users");
        }
      })
      .then((res) => {
        setUsers(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (users && users.length > 0) {
      const fuse = new Fuse(users, {
        includeScore: true,
        keys: ["first_name", "last_name", "email"],
      });
      const result = fuse.search(searchQuery);
      //console.log(result.slice(0, 10))
      setSearchResults(result.slice(0, 10));
    }
  }, [users, searchQuery]);

  return (
    <Container fluid>
      <Row>
        <Col md="12">
          <h2>Check In</h2>
          <p>
            Use this page to check in hackathon registrants at the time of the
            hackathon. Start typing to search for a user.
          </p>
        </Col>
      </Row>
      <Row>
        <Col md="6">
          {users && users.length > 0 ? (
            <div>
              <h4>1. Find Registrant</h4>
              <p>
                Look for the registrant. If the registrant has not completed
                registration, you will not be able to select them.
              </p>
              <Form>
                <Form.Group controlId="searchQuery">
                  <Form.Label>Search</Form.Label>
                  <Form.Control
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                    }}
                  ></Form.Control>
                  <Form.Text>Searches First Name, Last Name, and Email Address</Form.Text>
                </Form.Group>
              </Form>
              <ListGroup variant='flush'>
                {searchResults &&
                  searchResults.map((result) => {
                    return (
                        <ListGroup.Item
                        key={result.item.id}
                        className="d-flex flex-row align-items-center"
                        style={{backgroundColor: 'unset'}}
                      >
                        <div style={{ marginRight: "1rem" }}>
                          <img
                            style={{ height: "35px" }}
                            className="rounded-circle"
                            src={result.item.profile_picture_url}
                            onError={({ currentTarget }) => {
                              currentTarget.onerror = null; // prevents looping
                              currentTarget.src=`/api/files/favicon.ico`;
                            }}
                          ></img>
                        </div>
                        <div className="d-flex flex-column">
                          <div>
                            {result.item.first_name} {result.item.last_name}
                          </div>
                          <div className="text-muted">{result.item.email}</div>
                        </div>
                        <div style={{marginLeft: 'auto', alignItems: 'center'}}>
                            {result.item.registered === 1 && <Button size='sm' variant='dark'>Check In</Button>}
                            {result.item.registered === 0 && <span style={{color: 'red'}}><small>Registration Incomplete</small></span>}
                            </div>
                      </ListGroup.Item>
                    );
                  })}
              </ListGroup>
            </div>
          ) : (
            <Spinner animation="border" />
          )}
        </Col>
        <Col md="6">
          {users && users.length > 0 ? (
            <div>
              <h4>2. Check-In Registrant</h4>
            </div>
          ) : (
            <Spinner animation="border" />
          )}
        </Col>
      </Row>
    </Container>
  );
}
