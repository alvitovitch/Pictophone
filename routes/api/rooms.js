const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Room = require('../../models/Room');
const validateRoomInput = require('../../validation/room');
const passport = require('passport');

// Test route for rooms
router.get("/test", (req, res) => res.json({ msg: "This is the rooms route" }));

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
    // This didn't work
    // Room.findOne({id: req.params.room_id})
    //   .then(room => res.json(room))
    //   .catch(err =>
    //     res.status(404).json({ noroomfound: 'No room found with that ID' }))
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
    console.log(req.body.playerId);
    Room.findById(req.params.room_id)
      .then(room => {
        console.log(room.players);
        // if the room does not include the player passed into the reqeust body and there is still open space in the room
        !room.players.includes(req.body.playerId) && room.players.length < room.size ?
        // then add the request body playerId into the room's players array in the backend
        room.players.push(req.body.playerId) : 
        // else splice out the request body playerId from the room's player array
        room.players.splice(room.players.findIndex(id => id === req.body.playerId), 1);
        // save the updated room and render it as json
        room.save().then(res.json(room));
      })
      .catch(err => 
        res.status(404).json({ noroomfound: 'No room found with that ID' }))
  }
)


// DELETE a room backend route
router.delete("/:room_id",
  passport.authenticate('jwt', { session: false }),

  (req, res) => {
    console.log(req.params)
    Room.findByIdAndDelete(req.params.room_id)
      .then(room => res.json(room))
      .catch(err =>
        res.status(404).json({ noroomfound: 'No room found with that ID' }))
  }
)

module.exports = router;