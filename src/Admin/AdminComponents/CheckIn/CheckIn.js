import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Spinner,
  ListGroup,
  Form,
  Button,
  Alert,
  Card,
  InputGroup,
} from "react-bootstrap";
import Fuse from "fuse.js";

export default function CheckIn(props) {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});

  useEffect(() => {
    fetch("/api/user-utility/user?expanded=1", {
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
                  <Form.Text>
                    Searches First Name, Last Name, and Email Address
                  </Form.Text>
                </Form.Group>
              </Form>
              <ListGroup variant="flush">
                {searchResults &&
                  searchResults.map((result) => {
                    return (
                      <ListGroup.Item
                        key={result.item.id}
                        className="d-flex flex-row align-items-center"
                        style={{ backgroundColor: "unset" }}
                      >
                        <div style={{ marginRight: "1rem" }}>
                          <img
                            style={{ height: "35px" }}
                            className="rounded-circle"
                            src={result.item.profile_picture_url}
                            onError={({ currentTarget }) => {
                              currentTarget.onerror = null; // prevents looping
                              currentTarget.src = `/api/files/favicon.ico`;
                            }}
                          ></img>
                        </div>
                        <div className="d-flex flex-column">
                          <div>
                            {result.item.first_name} {result.item.last_name}
                          </div>
                          <div className="text-muted">{result.item.email}</div>
                        </div>
                        <div
                          style={{ marginLeft: "auto", alignItems: "center" }}
                        >
                          {result.item.registered === 1 && (
                            <Button
                              size="sm"
                              variant="dark"
                              onClick={() => {
                                setSelectedUser(result.item);
                              }}
                            >
                              Check In
                            </Button>
                          )}
                          {result.item.registered === 0 && (
                            <span style={{ color: "red" }}>
                              <small>Registration Incomplete</small>
                            </span>
                          )}
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
              {selectedUser && selectedUser.id && (
                <Card>
                  <Card.Body>
                    <div className="text-center">
                      <img
                        width="15%"
                        style={{ objectFit: "cover" }}
                        src={`${selectedUser.profile_picture_url}`}
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null; // prevents looping
                          currentTarget.src = `/api/files/cheesehacks_main.jpg`;
                        }}
                      ></img>
                      <Card.Title className="m-0 p-0">
                        {selectedUser.first_name} {selectedUser.last_name}
                      </Card.Title>
                      <p>{selectedUser.email}</p>
                    </div>
                    <hr />
                    <h5>Review Dietary Restrictions</h5>
                    <p><small>Ask the registrant if they have any dietary restrictions and correlate with the responses previously provided at time of registration.</small></p>
                    <table>
                      <tbody>
                        <tr>
                          <td>Vegan:</td>
                          <td>
                            {selectedUser.vegan ? (
                              <span className='text-danger fw-bold mx-1'>Yes</span>
                            ) : (
                              <span className='text-info fw-bold mx-1' >No</span>
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td>Vegetarian:</td>
                          <td>
                            {selectedUser.vegetarian ? (
                              <span className='text-danger fw-bold mx-1'>Yes</span>
                            ) : (
                              <span className='text-info fw-bold mx-1'>No</span>
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td>Lactose Intolerant:</td>
                          <td>
                            {selectedUser.lactose_intolerant ? (
                              <span className='text-danger fw-bold mx-1'>Yes</span>
                            ) : (
                              <span className='text-info fw-bold mx-1'>No</span>
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td>Gluten Intolerant:</td>
                          <td>
                            {selectedUser.gluten_free ? (
                              <span className='text-danger fw-bold mx-1'>Yes</span>
                            ) : (
                              <span className='text-info fw-bold mx-1'>No</span>
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td>Other Dietary Restrictions:</td>
                          <td>
                            {selectedUser.additional_diet ? (
                              <span className='text-danger fw-bold mx-1'>{selectedUser.additional_diet}</span>
                            ) : (
                              <span className='text-info fw-bold mx-1'>No</span>
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <hr />
                    <h5>Review Team Membership</h5>
                    {selectedUser.team_name ? <table>
                      <tbody>
                        <tr>
                        <td>Team Name</td>
                        <td className='text-success fw-bold mx-1'>{selectedUser.team_name}</td>
                        </tr>
                        <tr>
                        <td>Team Description</td>
                        <td>{selectedUser.team_description}</td>
                        </tr>
                      </tbody>
                    </table> : <span className='text-danger fw-bold mx-1'>User is not on a team.</span>}
                    <hr />
                    <h5>Complete Check-In</h5>
                    <p>If any of the above information is incorrect, please note below. Click submit to finish the check-in process.</p>
                    <InputGroup as='textarea' />
                    <div className='d-flex flex-row justify-content-center'>
                    <Button variant="success m-3">Submit</Button>
                    </div>
                  </Card.Body>
                </Card>
              )}
            </div>
          ) : (
            <Spinner animation="border" />
          )}
        </Col>
      </Row>
    </Container>
  );
}
