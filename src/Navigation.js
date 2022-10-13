import React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'

export default function Navigation(props) {
    return (<Navbar sticky="top" collapseOnSelect expand="lg" bg='dark' variant='dark'>
    <Container>
      <Navbar.Brand>CheeseHacks 2022</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav className="me-auto">
          <Nav.Link>About</Nav.Link>
          <Nav.Link>Sponsors</Nav.Link>
          <Nav.Link>Teams</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link>Login</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>)
}