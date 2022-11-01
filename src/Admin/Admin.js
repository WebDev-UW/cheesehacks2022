import React from 'react'
import { Col, Container, Nav, Row, Tab } from 'react-bootstrap'
import UserManagement from './AdminComponents/UserManagement'

export default function Admin(props) {
    return <Container fluid>
        <Tab.Container defaultActiveKey='users'>
        <Row className='my-3'>
            <Col sm='2'>
                <Nav variant='pills' className='flex-column'>
                    <Nav.Item><Nav.Link eventKey='users'>User Management</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link eventKey='teams'>Team Management</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link eventKey='diets'>Dietary Preferences</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link eventKey='submissions'>Submission Management</Nav.Link></Nav.Item>
                </Nav>
            </Col>
            <Col sm='10'>
                <Tab.Content>
                    <Tab.Pane eventKey='users'>
                        <React.StrictMode>
                        <UserManagement user={props.user} />
                        </React.StrictMode>
                    </Tab.Pane>
                </Tab.Content>
            </Col>
        </Row>
        </Tab.Container>
    </Container>
}