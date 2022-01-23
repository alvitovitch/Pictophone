const express = require("express");
const router = express.Router();
const Game = require('../../models/Game');
const passport = require('passport');

// GET an individual game backend route
router.get("/:gameId",
  passport.authenticate('jwt', { session: false }),

  (req, res) => {
    Game.find({ roomId: req.body.roomId })
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
router.patch("/:gameId",
  passport.authenticate('jwt', { session: false }),

  (req, res) => {
    Game.findById(req.body.gameId)
      .then(game => {
        game.chains.push(req.body.chainId);
        game.save().then(res.json(game));
      })
      .catch(err => 
        res.status(404).json({ nogamefound: 'No game found with that ID' }))
})

module.exports = router;
