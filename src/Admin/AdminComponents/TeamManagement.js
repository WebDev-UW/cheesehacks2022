import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Table, Spinner } from 'react-bootstrap'

export default function TeamManagement(props) {

    const [teams, setTeams] = useState([])

    useEffect(() => {
        fetch('/api/team-utility/team', {
            method: 'GET'
        })
        .then(res => {
            if (res.ok) {
                return res.json()
            } else {
                throw new Error('An unexpected error occurred')
            }
        })
        .then(res => {
            setTeams(res)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    return <Container fluid>
        <Row>
            <Col lg='12'>
                <h2>Team Management</h2>
                <p>After registration, users can register for teams. All hackathon users are required to join a team at the start of the hackathon (no single hacks). Users can join ahead of time on the <a href='/teams'>/teams</a> page.</p>
            </Col>
        </Row>
        <Row>
            <Col md='6'>
                <h4>Team List</h4>
                <p>All created teams</p>
                {teams && teams.length > 0 ? <Table>
                    <thead>
                        <tr>
                            <th>Team Name</th>
                            <th>Description</th>
                            <th>Team Captain</th>
                            <th>Created Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teams.map(team => {
                            return <tr key={team.id}><td>{team.name}</td><td>{team.description}</td><td>{team.team_captain}</td><td>{new Date(team.created_datetime).toDateString()}</td></tr>
                        })}
                    </tbody>
                    
                </Table> : <Spinner animation='border' />}
            </Col>
            <Col md='6'></Col>
        </Row>
    </Container>
}