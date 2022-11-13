import React, { useState } from 'react'
import { Button, Form, InputGroup, Modal } from 'react-bootstrap'

export default function SubmitSubmission(props) {

    const [url, setUrl] = useState('')
    const [link, setLink] = useState('')

    function uploadImage(image, setImg) {
        const formData = new FormData()
        formData.append('image', image)
        fetch('/api/files', {
            method: 'POST',
            body: formData
        })
        .then(res => {
            if (res.ok) {return res.json()} else {
                alert('Error on file upload')
            }
        })
        .then(res => {
          setUrl(res.filename)
        })
        .catch(err => {
            alert('Something went wrong')
        })
    }

    return <Modal show={props.show} onHide={props.onHide}>
        <Modal.Header>Submit Hack</Modal.Header>
        <Modal.Body>
            <p>Use this page to submit your project. You can resubmit as many times as you need.</p>
            <Form>
                <Form.Group controlId='file-upload'>
                <Form.Control type='file' onChange={(e) => {
                uploadImage(e.target.files[0])
              }}></Form.Control>
                <Form.Text>Upload a compressed (zipped) folder that contains your project repository</Form.Text>
                </Form.Group>
                <Form.Group controlId='link'  >
                    <Form.Label>Link to Repository</Form.Label>
                    <Form.Control type='link' value={link} onChange={e => {setLink(e.target.value)}}></Form.Control>
                    <Form.Text>This should link to your version control, such as your GitHub Repository.</Form.Text>
                </Form.Group>
                
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant='outline-danger' onClick={props.onHide}>Cancel</Button>
            <Button onClick={e => {
                if (url && url !== '' && link && link !== '') {
                    props.submitProject(url, link, props.setAsOf, props.team_id, props.onHide)
                } else {
                    alert('Please complete all fields before uploading')
                }
            }}>Submit</Button>
        </Modal.Footer>
    </Modal>
}