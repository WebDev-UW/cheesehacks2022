import React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import LoginButton from './NavigationComponents/LoginButton'

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
          <LoginButton user={props.user} />
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>)
}