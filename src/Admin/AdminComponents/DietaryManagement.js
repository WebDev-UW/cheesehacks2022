import React, { useEffect, useState } from "react";
import { Col, Container, Row, Spinner, Table } from "react-bootstrap";

export default function DietaryManagement(props) {
  const [users, setUsers] = useState([]);

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

  return (
    <Container fluid>
      <Row>
        <Col md="12">
          <h2>Dietary Preferences</h2>
          <p>
            When users register, they select their dietary preferences and
            confirm what they have selected is correct. They agree that unless
            they specify their preferences, we cannot gaurantee that we can
            provide them with accomodations. These selections are detailed
            below.
          </p>
        </Col>
      </Row>
      <Row>
        <Col md="6">
          <h4>Count of Preferences Selected</h4>
          <p>Users can select multiple, for example, someone can be both vegetarian and lactose intolerant.</p>

          {users && users.length > 0 ? (
            <Table>
              <thead>
                <tr>
                  <th>Preference</th>
                  <th>Count</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Vegan</td>
                  <td>{users.filter((val) => val.vegan === 1).length}</td>
                </tr>
                <tr>
                  <td>Vegetarian</td>
                  <td>{users.filter((val) => val.vegetarian === 1).length}</td>
                </tr>
                <tr>
                  <td>Lactose Intolerant</td>
                  <td>
                    {users.filter((val) => val.lactose_intolerant === 1).length}
                  </td>
                </tr>
                <tr>
                  <td>Gluten Free</td>
                  <td>{users.filter((val) => val.gluten_free === 1).length}</td>
                </tr>
                <tr>
                  <td>Other Restriction</td>
                  <td>
                    {users.filter((val) => val.additional_diet !== null).length}
                  </td>
                </tr>
              </tbody>
            </Table>
          ) : (
            <Spinner animation="border" />
          )}
        </Col>
        <Col md="6">
            <h4>Additional/Other Restrictions</h4>
            <p>Users can manually enter their restriction in addition to the checkboxes.</p>
            {users && users.length > 0 ? <Table>
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Restriction</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => {
                        if (user.additional_diet !== null) return <tr key={user.id}><td>{user.first_name} {user.last_name}</td><td>{user.additional_diet}</td></tr>
                    })}
                </tbody>
            </Table> : <Spinner animation='border' />}
        </Col>
      </Row>
    </Container>
  );
}
