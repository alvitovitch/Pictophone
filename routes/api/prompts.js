const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Prompt = require('../../models/Prompt');
const validatePromptInput = require('../../validation/prompt');
const passport = require('passport');

// GET all prompts backend route
router.get("/", 
  passport.authenticate('jwt', { session: false }),

  (req, res) => {
    Prompt.find()
      .sort({ date: -1})
      .then(prompts => res.json(prompts))
      .catch(err => res.status(404).json({ nopromptsfound: 'No prompts found' }))
})

// POST a new prompt backend route
router.post("/",
  passport.authenticate('jwt', { session: false }),

  (req, res) => {
    const { errors, isValid } = validatePromptInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Prompt.findOne({ name: req.body.name })
      .then(prompt => {
        if (prompt) {
          errors.name = "Prompt with that name already exists";
          return res.status(400).json(errors)
        } else {
          const newPrompt = new Prompt({
            name: req.body.name
          });

          newPrompt.save().then(prompt => res.json(prompt))
        }
      })
  }
)

module.exports = router;