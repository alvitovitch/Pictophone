const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Guess = require('../../models/Guess');
// const validateGuessInput = require('../../validation/guess);
const passport = require('passport');

// Test route for guesses
router.get("/test", (req, res) => res.json({ msg: "This is the guesses route" }));

// GET all guesses backend route (MAYBE)

// GET individual guess backend route (ABSOLUTELY)

// POST a guess backend route (ABSOLUTELY)

// PATCH a guess backend route (UNLIKELY)

// DELETE a guess backend route (UNLIKELY)

module.exports = router;