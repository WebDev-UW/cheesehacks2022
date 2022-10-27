const e = require("express");
const express = require("express");
const { linkUserToTeam, getCaptainOfTeam } = require("./functions");

const router = express.Router();

router.use((req, res, next) => {
  if (!req.session.passport || !req.session.passport.user.id) {
    res.sendStatus(401);
  } else {
    next();
  }
});

router.post("/:teamId", (req, res) => {
  if (!parseInt(req.params.teamId)) {
    res.sendStatus(400);
  } else {
    linkUserToTeam(req.params.teamId, req.session.passport.user.id)
      .then((success) => {
        res.json(success);
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json({ err: err });
      });
  }
});

router.patch("/:teamId", (req, res) => {
    if (!parseInt(req.params.teamId) || !req.body.id) {
        res.sendStatus(400)
    } else {
        getCaptainOfTeam(req.params.teamId)
    .then(cap => {
        if (!cap) {
            res.sendStatus(400)
        } else {
            if (req.session.passport.user.id === cap.team_captain) {
                linkUserToTeam(null, req.body.id)
                .then(success => {
                    res.sendStatus(200)
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json({err: err})
                })
            } else {
                res.status(403).json({err: 'User is not captain of team and does not have permission to complete action'})
            }
        }
        
    })
    .catch(err => {
        res.status(500).json({err: err})
    })
    }
});

router.delete('/', (req, res) => {
    linkUserToTeam(null, req.session.passport.user.id)
    .then(success => {
        res.sendStatus(204)
    })
    .catch(err => {
        res.status(500).json({err: err})
    })
})

module.exports = router