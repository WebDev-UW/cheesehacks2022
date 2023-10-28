import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Row, Table } from "react-bootstrap";

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes*60000);
}

const toSqlDatetime = (inputDate) => {
    const date = new Date(inputDate)
    const dateWithOffest = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
    return dateWithOffest
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ')
}

function updateTeam(data) {
    return new Promise((resolve, reject) => {
        fetch(`/api/team-utility/team/${data.id}`, {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        .then(res => {
            if (res.ok) {
                return res.json()
            } else {
                throw new Error('An unexpected error occurred updating teams')
            }
        })
        .then(res => {
            resolve(res)
        })
        .catch(err => {
            console.log(err)
        })
    })
}

export default function SubmissionManagement(props) {
  const [submissions, setSubmissions] = useState([]);
  const [users, setUsers] = useState([]);
  const [asOf, setAsOf] = useState(new Date());
  const [generateSchedule, setGenerateSchedule] = useState(false);
  const [startingTime, setStartingTime] = useState(new Date())
  const [timeInterval, setTimeInterval] = useState(10)
  const [schedules, setSchedules] = useState([[], [], []]);
  // const rooms = ['EdSci Room 212', 'EdSci Room 218', 'EdSci Room 228']
  const [rooms, setRooms] = useState(['Room 1', 'Room 2', 'Room 3']);

  const handleRoomNameChange = (e, index) => {
    const updatedRooms = [...rooms]; 
    updatedRooms[index] = e.target.value; 
    setRooms(updatedRooms); 
  };

  const handleNumberOfRoomsChange = (e) => {
    const numberOfRooms = parseInt(e.target.value, 10);
    
    if (!isNaN(numberOfRooms) && numberOfRooms >= 0) {
      const updatedRooms = [...rooms]; 
      
      if (numberOfRooms < rooms.length) {
        updatedRooms.length = numberOfRooms; 
      } else if (numberOfRooms > rooms.length) {
        const lastRoomNum = rooms.length;
        updatedRooms.push(`Room ${lastRoomNum + 1}`);
      }
  
      setRooms(updatedRooms);
    }
  };
   

  function confirmJudging() {
    const promises = []
    for (var i = 0; i < rooms.length; i++) {
        schedules[i].forEach(team => {
            team.judge_time = toSqlDatetime(team.judge_time);
            delete team.created_datetime
            delete team.count
            promises.push(updateTeam(team))
        })
    }
    Promise.all(promises)
    .then(complete => {
        setGenerateSchedule(false)
    })
    .catch(err => {
        alert(err)
    })
  }

  useEffect(() => {
    fetch("/api/submission-utility?withTeams=1", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("An unexpected error occurred");
        }
      })
      .then((res) => {
        setSubmissions(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [asOf]);

  useEffect(() => {
    if (generateSchedule && submissions && submissions.length > 0) {
      const newSchedule = [[], [], []];
      const shuffledSubmissions = JSON.parse(JSON.stringify(submissions));
      shuffle(shuffledSubmissions);
      let num = 0;
      //console.log(shuffledSubmissions);
      while (shuffledSubmissions.length > 0) {
        //console.log(shuffledSubmissions);
        newSchedule[num].push(shuffledSubmissions.pop());
        num = num === 2 ? 0 : num + 1;
      }
      
      for (var i = 0; i < 3; i++) {
        //let time = startingTime
        newSchedule[i] = newSchedule[i].map(
            (team, k) => {
                team.judge_location = rooms[i]
                team.judge_time = addMinutes(startingTime, k*timeInterval)
                return team
            }
        )
      }
      setSchedules(newSchedule)
      
    }
  }, [generateSchedule, submissions, timeInterval, startingTime]);

  return (
    <Container fluid>
      <Row>
        <Col md="12">
          <h2>Submission Management</h2>
        </Col>
      </Row>
      <Row>
        <Col md="6">
          {submissions && submissions.length > 0 && (
            <Table>
              <thead>
                <tr>
                  <th>Team</th>
                  <th># Submissions</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((submission) => {
                  return (
                    <tr key={submission.team_id}>
                      <td>{submission.name}</td>
                      <td>{submission.count}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}
        </Col>
        <Col md="6">
          {generateSchedule ? (
            <div>
                <h4>Configure Schedule</h4>
                <p>Set the start time for judging, as well as the interval between judging rounds. The number of rooms is hard coded to 3 rooms.</p>
                <Form>
                    <Form.Group controlId='start-time'>
                        <Form.Label>Start Time</Form.Label>
                        <Form.Control type='datetime-local' value={new Date(startingTime).toISOString().slice(0,16)} onChange={e => {setStartingTime(new Date(e.target.value))}}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Time Intervals</Form.Label>
                        <Form.Control type='number' value={timeInterval} onChange={e => {setTimeInterval(e.target.value)}}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="number-of-rooms">
                      <Form.Label>Number of Rooms</Form.Label>
                      <Form.Control
                        type="number"
                        value={rooms.length} // The current number of rooms
                        onChange={(e) => handleNumberOfRoomsChange(e)}
                      />
                    </Form.Group>
                    {rooms.map((room, index) => (
                      <Form.Group key={index} controlId={`room-name-${index}`}>
                        <Form.Label>Room {index + 1} Name</Form.Label>
                        <Form.Control
                          type="text"
                          value={rooms[index]}
                          onChange={(e) => handleRoomNameChange(e, index)}
                        />
                      </Form.Group>
                    ))}
                </Form>
                <hr />
              <h4>Proposed Schedule</h4>
              <p>This schedule has been randomly generated meeting the above requirements.</p>
              <Table>
                <thead>
                    <tr><th colSpan={3}>{rooms[0]}</th></tr>
                    <tr>
                        <th>Team Name</th>
                        <th>Location</th>
                        <th>Judging Time</th>
                    </tr>
                </thead>
                <tbody>
                    {schedules[0].length > 0 && schedules[0].map(team => {
                        return <tr key={team.id}><td>{team.name}</td><td>{team.judge_location}</td><td>{new Date(team.judge_time).toLocaleString()}</td></tr>
                    })}
                </tbody>
              </Table>
              <Table>
                <thead>
                    <tr><th colSpan={3}>{rooms[1]}</th></tr>
                    <tr>
                        <th>Team Name</th>
                        <th>Location</th>
                        <th>Judging Time</th>
                    </tr>
                </thead>
                <tbody>
                    {schedules[1].length > 0 && schedules[1].map(team => {
                        return <tr key={team.id}><td>{team.name}</td><td>{team.judge_location}</td><td>{new Date(team.judge_time).toLocaleString()}</td></tr>
                    })}
                </tbody>
              </Table>
              <Table>
                <thead>
                    <tr><th colSpan={3}>{rooms[2]}</th></tr>
                    <tr>
                        <th>Team Name</th>
                        <th>Location</th>
                        <th>Judging Time</th>
                    </tr>
                </thead>
                <tbody>
                    {schedules[2].length > 0 && schedules[2].map(team => {
                        return <tr key={team.id}><td>{team.name}</td><td>{team.judge_location}</td><td>{new Date(team.judge_time).toLocaleString()}</td></tr>
                    })}
                </tbody>
              </Table>
              <hr />
              <h4>Adopt Schedule</h4>
              <Alert variant='warning'>There is no validation, only click this button once. Ryan was tired and couldn't be bothered writing error checking and stuff. Submitting more than once will overwrite the existing times and locations for every team.</Alert>
              <p>Once you click this, the times and locations for judging will be sent to each team to view on their team page.</p>
              <Button variant='success' onClick={e => confirmJudging()}>Adopt</Button>
            </div>
          ) : (
            <Button
              onClick={(e) => {
                setGenerateSchedule(true);
              }}
            >
              Generate Judging Schedule
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  );
}
