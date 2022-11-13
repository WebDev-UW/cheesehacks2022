import React, { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";

export default function JudgeDash(props) {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    fetch("/api/submission-utility?withTeams=1", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("An unexpected error occurred.");
        }
      })
      .then((res) => {
        setSubmissions(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container>
      <Row className='my-3'>
        <Col>
          <Table striped>
            <thead>
                <tr><th colSpan={3} className='text-center'>CheeseHacks Judging Schedule</th></tr>
              <tr>
                <th>Team Name</th>
                <th>Room</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {submissions &&
                submissions.length > 0 &&
                submissions.filter(team => team.judge_time).sort((a,b) => new Date(a.judge_time).valueOf() - new Date(b.judge_time).valueOf()).map((team) => {
                  return (
                    <tr key={team.id}>
                      <td>{team.name}</td>
                      <td>{team.judge_location}</td>
                      <td>{new Date(team.judge_time).toLocaleTimeString()}</td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}
