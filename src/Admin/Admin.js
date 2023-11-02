import React from 'react'
import { Col, Container, Nav, Row, Tab } from 'react-bootstrap'
import CheckIn from './AdminComponents/CheckIn/CheckIn'
import DietaryManagement from './AdminComponents/DietaryManagement'
import SubmissionManagement from './AdminComponents/SubmissionManagement'
import TeamManagement from './AdminComponents/TeamManagement'
import UserManagement from './AdminComponents/UserManagement'
import Judging from './AdminComponents/Judging'

export default function Admin(props) {
    return <Container fluid>
        <Tab.Container defaultActiveKey='users'>
        <Row className='my-3'>
            <Col md='2'>
                <Nav variant='pills' className='flex-column'>
                    <Nav.Item><Nav.Link eventKey='users'>User Management</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link eventKey='teams'>Team Management</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link eventKey='diets'>Dietary Preferences</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link eventKey='submissions'>Submission Management</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link eventKey='checkin'>Check In</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link eventKey='judging'>Judging</Nav.Link></Nav.Item>
                </Nav>
            </Col>
            <Col md='10'>
                <Tab.Content>
                    <Tab.Pane eventKey='users'>
                        <React.StrictMode>
                        <UserManagement user={props.user} />
                        </React.StrictMode>
                    </Tab.Pane>
                    <Tab.Pane eventKey='teams'>
                        <React.StrictMode>
                            <TeamManagement user={props.user} />
                        </React.StrictMode>
                    </Tab.Pane>
                    <Tab.Pane eventKey='diets'>
                        <React.StrictMode>
                            <DietaryManagement user={props.user} />
                        </React.StrictMode>
                    </Tab.Pane>
                    <Tab.Pane eventKey='submissions'>
                        <React.StrictMode>
                            <SubmissionManagement user={props.user} />
                        </React.StrictMode>
                    </Tab.Pane>
                    <Tab.Pane eventKey='checkin'>
                        <React.StrictMode>
                            <CheckIn user={props.user} />
                        </React.StrictMode>
                    </Tab.Pane>
                    <Tab.Pane eventKey='judging'>
                        <React.StrictMode>
                            <Judging user={props.user} />
                        </React.StrictMode>
                    </Tab.Pane>
                </Tab.Content>
            </Col>
        </Row>
        </Tab.Container>
    </Container>
}