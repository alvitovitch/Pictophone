const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Drawing = require('../../models/Drawing');
// const validateDrawingInput = require('../../validation/drawing');
const passport = require('passport');

// Test route for drawings
router.get("/test", (req, res) => res.json({ msg: "This is the drawings route" }));

// GET all drawings backend route

// GET individual drawings backend route

// POST a drawing backend route

// PATCH a drawing backend route

// DELETE a drawing backend route

module.exports = router;