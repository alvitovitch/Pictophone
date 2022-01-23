const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Room = require('../../models/Room');
const validateRoomInput = require('../../validation/room');
const passport = require('passport');

// GET all rooms backend route
router.get("/",
  passport.authenticate('jwt', { session: false }),

  (req, res) => {
    Room.find()
      .sort({ date: -1 })
      .then(rooms => res.json(rooms))
      .catch(err => res.status(404).json({ noroomsfound: 'No rooms found' }))
})

// GET individual room backend route
router.get("/:room_id", 
  passport.authenticate('jwt', { session: false }),

  (req, res) => {
    Room.findById(req.params.room_id)
      .then(room => res.json(room))
      .catch(err => 
        res.status(404).json({ noroomfound: 'No room found with that ID'}))
  }
)

// POST a room backend route
router.post("/", 
  passport.authenticate('jwt', { session: false }),

  (req, res) => {
    const { errors, isValid } = validateRoomInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Room.findOne({ name: req.body.name })
      .then(room => {
        if (room) {
          errors.name = "Room with that name already exists";
          return res.status(400).json(errors)
        } else {
          const newRoom = new Room({
            name: req.body.name,
            size: req.body.size,
            host: req.body.host_id
          });

          newRoom.save().then(room => res.json(room));
        }
      })
  }
)

// PATCH a room backend route
router.patch("/:room_id",
  passport.authenticate('jwt', { session: false }),

  (req, res) => {
    Room.findById(req.params.room_id)
      .then(room => {
        !room.players.includes(req.body.playerId) && room.players.length < room.size ?
        room.players.push(req.body.playerId) : 
        room.players.splice(room.players.findIndex(id => id === req.body.playerId), 1);
        
        room.save({players: room.players}).then(res.json(room));
      })
      .catch(err => 
        res.status(404).json({ noroomfound: 'No room found with that ID' }))
  }
)


// DELETE a room backend route
router.delete("/:room_id",
  passport.authenticate('jwt', { session: false }),

  (req, res) => {
    Room.findByIdAndDelete(req.params.room_id)
      .then(room => res.json(room))
      .catch(err =>
        res.status(404).json({ noroomfound: 'No room found with that ID' }))
  }
)

module.exports = router;