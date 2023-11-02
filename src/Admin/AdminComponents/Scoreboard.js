import React, { useEffect, useState } from 'react';

export default function Scoreboard() {
    const [scores, setScores] = useState([]);

    useEffect(() => {
        const fetchScores = async () => {
            const response = await fetch('/api/team-utility/judging/scores');
            let data = await response.json();

            // Calc total score
            data = data.map(teamScore => ({
                ...teamScore,
                total: ['innovation', 'style', 'creativity', 'viability']
                    .reduce((acc, curr) => acc + (teamScore[curr] || 0), 0)
            }));

            // Sort by total score in descending order
            data.sort((a, b) => b.total - a.total);

            setScores(data);
        };

        fetchScores().catch(console.error);
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="mb-4 text-center">Scoreboard</h1>
            <div className="table-responsive">
                <table className="table table-striped table-hover table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>Team Name</th>
                            <th>Innovation</th>
                            <th>Style</th>
                            <th>Creativity</th>
                            <th>Viability</th>
                            <th>Total Score</th>
                            <th>Judged At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scores.map((teamScore) => (
                            <tr key={teamScore.team_id}>
                                <td>{teamScore.name || 'No Team Name'}</td>
                                <td>{teamScore.innovation || 'No Score'}</td>
                                <td>{teamScore.style || 'No Score'}</td>
                                <td>{teamScore.creativity || 'No Score'}</td>
                                <td>{teamScore.viability || 'No Score'}</td>
                                <td>{teamScore.total}</td>
                                <td>{teamScore.created_at ? new Date(teamScore.created_at).toLocaleString() : 'No Time'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
