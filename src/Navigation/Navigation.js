import React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
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
          <Link to='/home' style={{textDecoration: 'none', padding: "8px 0 0 8px", color: "var(--bs-nav-link-color)"}}>Home</Link>
        </Nav>
        <Nav>
          <LoginButton user={props.user} />
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>)
}