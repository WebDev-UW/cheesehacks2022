import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

export default function NotFound(props) {
    return <Container>
        <Row className='my-3'>
            <Col><h1>Ope!</h1><p>This isn't gouda. The page you were looking for does not exist.</p></Col>
        </Row>
    </Container>
}