const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Guess = require('../../models/Guess');
const validateGuessInput = require('../../validation/guess');
const passport = require('passport');

// GET all guesses backend route
router.get("/", 
  passport.authenticate('jwt', { session: false }),

  (req, res) => {
    Guess.find()
      .sort({ date: -1 })
      .then(guesses => res.json(guesses))
      .catch(err => res.status(404).json({ noguessesfound: 'No guesses found' }))
})

// GET individual guess backend route
router.get("/:guessId",
  passport.authenticate('jwt', { session: false }),

  (req, res) => {
    const roomId = req.params.guessId.split(',')[0];
    const chainId = req.params.guessId.split(',')[1]; 

    Guess.find({ chainId: chainId })
      .then(guesses => {

        let guess = guesses.filter(guess => guess.roomId === roomId);
        res.json(...guess);
      })
      .catch(err => res.status(404).json({ noguessfound: 'No guess with that chainId and roomId found' }))
  }
)

// POST a guess backend route
router.post("/",
  passport.authenticate('jwt', { session: false }),

  (req, res) => {
    const { errors, isValid } = validateGuessInput(req.body)

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newGuess = new Guess({
      word: req.body.word,
      roomId: req.body.roomId,
      userId: req.body.userId,
      chainId: req.body.chainId
    })

    newGuess.save().then(guess => res.json(guess));
  }
)

module.exports = router;