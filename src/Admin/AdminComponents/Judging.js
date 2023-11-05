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
                                    Score of 1: The project simply repackages existing technology or solutions without any novel application or integration. It does not present any discernible advancement or unique use of technology. For instance, creating a basic calculator app that does not improve upon or modify any existing functionalities.<br /> <br />

                                    Score of 5: The project shows a moderate level of innovation by integrating well-known technologies in a somewhat novel way or by fulfilling a common technological need with a slight twist. An example could be a photo-sharing app that integrates a basic existing filter feature not yet common in similar apps. <br/> <br />

                                    Score of 10: The project is a groundbreaking development that significantly pushes the envelope of what’s currently possible. It could be a tool that uniquely combines AR and crowd-sourced data to solve complex urban planning challenges, or a new algorithm that dramatically improves the efficiency of renewable energy systems.
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
                                    Score of 1: The project's design is non-functional, with a confusing layout, incoherent color scheme, and lack of attention to user experience. An example could be a text-based interface with harsh colors, poor alignment, and hard-to-read fonts. <br /> <br />

                                    Score of 5: The project has a competent design with an adequate user interface that covers the basics of user experience but lacks the polished, intuitive feel of professional designs. It could be a blog with a clean layout but standard template without any unique branding or design elements. <br /> <br />

                                    Score of 10: The project boasts a stellar design that rivals or surpasses professional standards. It combines aesthetics with functionality seamlessly, such as a fitness app with an engaging, intuitive interface, and smooth interactions that provide an exceptional user experience.
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
                                    Score of 1: The project does not demonstrate original thought or novel concepts. It might be yet another to-do list app with standard features and no unique twist or new approach to the problem it aims to solve. <br /> <br />

                                    Score of 5: The project exhibits some creative elements or a unique feature set that differentiates it from typical applications, though it may still draw heavily from existing ideas. For example, a dating app that incorporates a new matching algorithm based on a user’s choice of movies. <br /> <br />

                                    Score of 10: The project is a testament to out-of-the-box thinking and originality, providing a solution or experience that is entirely unique. An example could be an app that gamifies social volunteering, connecting people with local social causes in an interactive, competitive format.
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
                                    Score of 1: The project is impractical for real-world application, either because it addresses a non-existent problem, is too niche without a clear target audience, or is technologically unfeasible. For example, an app that catalogues sand types from beaches around the world – interesting, but with limited market appeal and use case. <br /> <br />

                                    Score of 5: The project serves a legitimate need and could potentially attract a user base, but may lack a clear business model or evidence of market demand. It might be a well-designed meal-planning app that doesn't clearly outshine the many competitors in the market. <br /> <br />

                                    Score of 10: The project is highly marketable with a clear value proposition, strong user appeal, and potential for monetization or significant impact. It could be an app that effectively manages and schedules freelance gigs for a growing gig economy, connecting workers with opportunities in a streamlined, efficient manner.
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
