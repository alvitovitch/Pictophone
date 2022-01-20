const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Guess = require('../../models/Guess');
const validateGuessInput = require('../../validation/guess');
const passport = require('passport');

// Test route for guesses
router.get("/test", (req, res) => res.json({ msg: "This is the guesses route" }));

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
// Conditional on whether the req body is passed a guessId params wildcard or a chainId/roomId
router.get("/:guessId",
  passport.authenticate('jwt', { session: false }),

  (req, res) => {
    const roomId = req.params.guessId.split(',')[0];
    const chainId = req.params.guessId.split(',')[1]; 
    // if (!req.body.chainId) {
    // // If no chainId is passed in the request body, this will return the single guess with that guessId that is passed in instead via params
    // Guess.findById(req.params.guessId) //potentially change this to guessId passed in body?
    //   .then(guess => res.json(guess))
    //   .catch(err => 
    //     res.status(404).json({ noguessfound: 'No guess found with that ID' }))
    // } else {
    // Else it will look for guesses with that chain Id and then filter out the single guess that belongs to the roomId passed in the request body as well
    Guess.find({ chainId: chainId })
      .then(guesses => {
        // let roomId = req.body.roomId;

        let guess = guesses.filter(guess => guess.roomId === roomId);
        res.json(...guess);
      })
      .catch(err => res.status(404).json({ noguessfound: 'No guess with that chainId and roomId found' }))
    // }
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

// PATCH a guess backend route (UNLIKELY)

// DELETE a guess backend route (UNLIKELY)

module.exports = router;