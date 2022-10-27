import React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import LoginButton from './NavigationComponents/LoginButton'

export default function Navigation(props) {
    return (<Navbar sticky="top" collapseOnSelect expand="lg" bg='dark' variant='dark'>
    <Container>
      <Navbar.Brand href="/">CheeseHacks 2022</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav className="me-auto">
          <Nav.Link href='#about'>About</Nav.Link>
          <Nav.Link href='#sponsors'>Sponsors</Nav.Link>
          <Nav.Link href='/teams'>Teams</Nav.Link>
        </Nav>
        <Nav>
          <LoginButton user={props.user} />
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>)
}