import React from 'react'
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import LoginButton from './NavigationComponents/LoginButton'

export default function Navigation(props) {
    return (<Navbar sticky="top" collapseOnSelect expand="lg" bg='dark' variant='dark'>
    <Container>
      <Navbar.Brand href="/">CheeseHacks 2023</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav className="me-auto">
          <Nav.Link href='/#about'>About</Nav.Link>
          <Nav.Link href='/#sponsors'>Sponsors</Nav.Link>
          <Nav.Link href='/teams'>Teams</Nav.Link>
          {props.user && props.user.registered ? <Nav.Link href='https://discord.gg/sHWBYKsakg'><i class="bi bi-discord"></i> Discord</Nav.Link> : <></>}
          {props.user && props.user.admin === 1 ? <Nav.Link href='/admin'><i class="bi bi-tools"></i> Admin</Nav.Link> : <></>}
          {props.user && props.user.admin === 1 ? <NavDropdown id='dropdowns' title='Dashboards'>
            <NavDropdown.Item href='/checkins'>Check-Ins</NavDropdown.Item>
            <NavDropdown.Item href='/schedule'>Judging Schedule</NavDropdown.Item>
          </NavDropdown> : <></>}
        </Nav>
        <Nav>
          <LoginButton user={props.user} />
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>)
}