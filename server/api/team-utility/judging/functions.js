const db = require("../../../db")

/**
 * 
 * @param {Integer} team_id 
 * @param {Integer} innovation_score 
 * @param {Integer} style_score
 * @param {Integer} creativity_score
 * @param {Integer} visibility_score
 * @returns Promise that resolves to information about the submitted score
 */
function SubmitJudgingScores(team_id, innovation_score, style_score, creativity_score, viability_score) {
    return new Promise((resolve, reject) => {
        const sql = `
            INSERT INTO team_scores (team_id, innovation, style, creativity, viability)
            VALUES (?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE 
            innovation = VALUES(innovation),
            style = VALUES(style),
            creativity = VALUES(creativity),
            viability = VALUES(viability);
        `;
        db.query(sql, [team_id, innovation_score, style_score, creativity_score, viability_score], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
}

module.exports = {SubmitJudgingScores}