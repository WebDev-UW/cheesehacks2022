import React, { useEffect, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  Placeholder,
  Row,
  Spinner,
  Table,
  Form,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
  
    function loadUser(id) {
        return new Promise((resolve, reject) => {
            fetch(`/api/user-utility/user/${id}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            })
            .then((res) => {
            return res.ok ? res.json() : new Error("An unexpected error occurred");
            })
            .then((res) => {
            resolve(res[0]);
            })
            .catch((err) => {
            reject(err);
            });
        });
    }
  
    function renderMember(member, teamCaptain) {
        const crownSymbol = '👑';

        return (
            <ListGroup.Item
            key={member.id}
            className="d-flex flex-row align-items-center"
            >
            <div style={{ marginRight: "1rem" }}>
                <img
                style={{ height: "35px" }}
                className="rounded-circle"
                src={member.profile_picture_url}
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = `/api/files/favicon.ico`;
                }}
                ></img>
            </div>
            <div className="d-flex flex-column">
                <div>
                {member.first_name} {member.last_name}
                {teamCaptain && member.id === teamCaptain.id && (
                    <span>&nbsp;{crownSymbol}</span>
                )}
                </div>
                <div className="text-muted">{member.email}</div>
            </div>
            </ListGroup.Item>
        );
    }

export default function JudgingPage() {

    const [allTeams, setAllTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [teamCaptain, setTeamCaptain] = useState(null);
    const [members, setMembers] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        fetch('/api/team-utility/team', {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        })
        .then(res => res.json())
        .then(data => {
            setAllTeams(data);
        })
        .catch(err => {
            console.error('Error loading all teams:', err);
        });
    }, []);


    const [scores, setScores] = useState({
        innovation: '',
        style: '',
        creativity: '',
        viability: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setScores(prevScores => ({ ...prevScores, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Reset messages
        setErrorMessage('');
        setSuccessMessage('');

        // Convert score values to integers
        const integerScores = Object.entries(scores).reduce((acc, [key, value]) => {
            acc[key] = parseInt(value, 10); // Convert each score to an integer
            return acc;
        }, {});
    
        // Validation: Ensure all scores are within the range
        const scoreValues = Object.values(scores).map(Number); // Convert all scores to numbers
        if (scoreValues.some(score => score < 0 || score > 10)) {
            setErrorMessage('Scores must be between 0 and 10.');
            return;
        }
    
        // Assuming `selectedTeam` contains the selected team ID
        if (!selectedTeam) {
            setErrorMessage('No team selected.');
            return;
        }
    
        try {

            console.log('Submitting scores:', {
                team_id: selectedTeam.id,
                ...integerScores,
            });

            const response = await fetch('/api/team-utility/judging/submit-scores', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    team_id: selectedTeam.id,
                    ...integerScores,
                }),
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const result = await response.json();
            
            setSuccessMessage('Scores submitted successfully!');
            console.log('Scores submitted successfully', result);
        } catch (error) {
            setErrorMessage('An error occurred while submitting scores. Please try again.');
            console.error('An error occurred while submitting scores', error);
        }
    };

    const handleTeamSelect = async (event) => {
        const teamId = event.target.value;
    
        if (!teamId) return;
    
        await fetch(`/api/team-utility/team/judging/${teamId}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        }).then(res => res.json())
        .then(data => {
            setSelectedTeam(data[0]);
        })
        .catch(err => {
            console.error('Error loading team to be judged:', err);
        });

    };

    useEffect(() => {
        console.log(selectedTeam);
        if (selectedTeam) {
            if (selectedTeam.user_ids) {
                const ids = selectedTeam.user_ids.split(",");
                console.log("team ids", selectedTeam.user_ids)
                const promises = ids.map((id) => loadUser(id));
                Promise.all(promises).then((data) => {
                    setMembers(data);
                });
            } else {
                setMembers([]);
            }

            if (selectedTeam.team_captain) {
                const teamCaptainId = selectedTeam.team_captain;
                loadUser(teamCaptainId)
                .then(data => {
                    setTeamCaptain(data);
                })
                .catch(error => {
                    console.error('Error loading team captain:', error);
                });
            } else {
                setTeamCaptain(null);
            }
        }
        if (members) {
            console.log(members)
        }
    }, [selectedTeam]);
    

    return (
        <Container fluid>
            <h2 className="my-4">Judging Criteria</h2>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            <Form onSubmit={handleSubmit}>
            <Form.Group controlId="selectTeam">
                <Form.Label>Select a team to judge:</Form.Label>
                <Form.Control as="select" onChange={handleTeamSelect}>
                    <option value="" disabled selected>Select a team</option>
                    {allTeams.map(team => (
                        <option key={team.id} value={team.id}>
                            {team.name}
                        </option>
                    ))}
                </Form.Control>
            </Form.Group>
                <Row>
                    <Col md={6}>
                        <Card className="my-3 shadow">
                            <Card.Body>
                                <Card.Title>
                                    Members{" "}
                                    {selectedTeam && selectedTeam.user_ids ? (
                                        <Badge variant="dark">{selectedTeam.user_ids.split(',').length} / 4</Badge>
                                    ) : null}
                                </Card.Title>
                                    <ListGroup variant="flush">
                                        {members && members.length > 0 ? (
                                            members.map((member) =>
                                            renderMember(
                                                member,
                                                teamCaptain
                                            )
                                            )
                                        ) : (
                                            <></>
                                        )}
                                        {members && members.length === 0 ? (
                                            <p className="text-muted">No members</p>
                                        ) : (
                                            <></>
                                        )}
                                        {!members && (
                                            <Spinner className="m-auto my-3" animation="border" />
                                        )}
                                        </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6}>
                        <Card className="my-3 shadow">
                            <Card.Body>
                                <Card.Title>Innovation</Card.Title>
                                <Card.Text>
                                    Build a project that expands on the technologies...
                                </Card.Text>
                                <Form.Group>
                                    <Form.Label>Score</Form.Label>
                                    <Form.Control 
                                        type="number" 
                                        name="innovation" 
                                        value={scores.innovation} 
                                        onChange={handleChange} 
                                    />
                                </Form.Group>
                            </Card.Body>
                        </Card>

                        <Card className="my-3 shadow">
                            <Card.Body>
                                <Card.Title>Style</Card.Title>
                                <Card.Text>
                                    Who cares what the website does...
                                </Card.Text>
                                <Form.Group>
                                    <Form.Label>Score</Form.Label>
                                    <Form.Control 
                                        type="number" 
                                        name="style" 
                                        value={scores.style} 
                                        onChange={handleChange} 
                                    />
                                </Form.Group>
                            </Card.Body>
                        </Card>

                        <Card className="my-3 shadow">
                            <Card.Body>
                                <Card.Title>Creativity</Card.Title>
                                <Card.Text>
                                    Think outside of the box...
                                </Card.Text>
                                <Form.Group>
                                    <Form.Label>Score</Form.Label>
                                    <Form.Control 
                                        type="number" 
                                        name="creativity" 
                                        value={scores.creativity} 
                                        onChange={handleChange} 
                                    />
                                </Form.Group>
                            </Card.Body>
                        </Card>

                        <Card className="my-3 shadow">
                            <Card.Body>
                                <Card.Title>Viability</Card.Title>
                                <Card.Text>
                                    After all is said and done...
                                </Card.Text>
                                <Form.Group>
                                    <Form.Label>Score</Form.Label>
                                    <Form.Control 
                                        type="number" 
                                        name="viability" 
                                        value={scores.viability} 
                                        onChange={handleChange} 
                                    />
                                </Form.Group>
                            </Card.Body>
                        </Card>
                    </Col>
                
                </Row>
                <Button type="submit" className="mt-3">Submit Scores</Button>
            </Form>
        </Container>
    );
}
