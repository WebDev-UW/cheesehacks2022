const e = require("express");
const express = require("express");
const { SubmitJudgingScores } = require("./functions");

const router = express.Router();

router.use((req, res, next) => {
  if (!req.session.passport || !req.session.passport.user.id) {
    res.sendStatus(401);
  } else {
    next();
  }
});

router.post('/submit-scores', (req, res) => {
  const { team_id, innovation, style, creativity, viability } = req.body;

  const scores = [innovation, style, creativity, viability];

  if (!Number.isInteger(team_id) || team_id < 0) {
      return res.status(400).json({ message: 'Invalid team ID. Must be an integer greater than 0.' });
  }

  for (const score of scores) {
      if (typeof score !== 'number' || score < 0 || score > 10) {
          return res.status(400).json({ message: 'Scores must be numbers between 0 and 10 inclusive.' });
      }
  }

  SubmitJudgingScores(team_id, innovation, style, creativity, viability)
      .then(result => {
          res.status(200).json({ message: 'Scores submitted successfully', result });
      })
      .catch(err => {
          console.error(err);
          res.status(500).json({ message: 'An error occurred while submitting scores' });
      });
});

module.exports = router