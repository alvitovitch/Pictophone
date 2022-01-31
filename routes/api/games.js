const express = require("express");
const router = express.Router();
const Game = require('../../models/Game');
const passport = require('passport');
const { GameLift } = require("aws-sdk");

// GET an individual game backend route
router.get("/:roomId",
  passport.authenticate('jwt', { session: false }),

  (req, res) => {
    // console.log(req)
    Game.findOne({ roomId: req.params.roomId })
      .then(game => res.json(game))
      .catch(err => res.status(404).json({ nogamefound: 'No game found with that roomId' }))
})

// POST a game backend route
router.post("/",
  passport.authenticate('jwt', { session: false }),

  (req, res) => {
    const newGame = new Game({
      roomId: req.body.roomId
    })

    newGame.save().then(game => res.json(game));
  }
)

// PATCH a game backend route
router.patch("/:roomId",
  passport.authenticate('jwt', { session: false }),

  (req, res) => {
    Game.findOne({ roomId: req.params.roomId })
      .then(game => {
        game.chains.push(req.body);
        game.save().then(res.json(game));
      })
      .catch(err => 
        res.status(404).json({ nogamefound: 'No game found with that ID' }))
})

module.exports = router;
