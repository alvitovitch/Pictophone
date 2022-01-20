const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Drawing = require('../../models/Drawing');
// const validateDrawingInput = require('../../validation/drawing');
const passport = require('passport');

// Test route for drawings
router.get("/test", (req, res) => res.json({ msg: "This is the drawings route" }));

// GET all drawings backend route
router.get("/", 
  passport.authenticate('jwt', { session: false }),

  (req, res) => {
    Drawing.find()
      .sort({ date: -1 })
      .then(drawings => res.json(drawings))
      .catch(err => res.status(404).json({ nodrawingsfound: 'No drawings found' }))
})

// axios.get("/:drawingId", {roomId, chainId}

// GET individual drawings backend route
// Conditional on whether the req body is passed a drawingId wildcard or a chainId/roomId
router.get("/:drawingId",
  passport.authenticate('jwt', { session: false }),
  
  (req, res) => {
    console.log(req.params.drawingId.split(','));
    const roomId= req.params.drawingId.split(',')[0]; 
    const chainId= req.params.drawingId.split(',')[1]; 
    // if (!req.body.chainId) { 
    // // If no chaindId is passed in the request body, this will return the single drawing with that drawingId that is passed in instead via params
    // Drawing.findById(req.params.drawingId) //potentially change this to drawingId passed in body?
    //   .then(drawing => res.json(drawing))
    //   .then(() => console.log("first"))
    //   .catch(err => 
    //     res.status(404).json({ nodrawingfound: 'No drawing found with that ID' }))
    // } else {
    // Else it will look for drawings with that chainId and then filter out the single drawing that belongs to the roomId passed in the request body as well
    Drawing.find({ chainId: chainId })
      .then(drawings => {
        // let roomId = roomId;

        let drawing = drawings.filter(drawing => drawing.roomId === roomId);
        res.json(...drawing);
      })
      .then(() => console.log("second"))
      .catch(err => res.status(404).json({ nodrawingfound: 'No drawing with that chainId and roomId found' }))
    // }
  }
)

// POST a drawing backend route
router.post("/", 
  passport.authenticate('jwt', { session: false }),

  (req, res) => {
    // Validation for assetUrl needed?
    // const { errors, isValid } = ValidateDrawingInput(req.body);

    // if (!isValid) {
    //   return res.status(400).json(errors);
    // }
    console.log(req.body)
    Drawing.findOne({ assetUrl: req.body.assetUrl })
      .then(drawing => {
        if (drawing) {
          errors.assetUrl = "Drawing with that assetUrl already exists";
          return res.status(400).json(errors)
        } else {
          const newDrawing = new Drawing({
            assetUrl: req.body.assetUrl,
            roomId: req.body.roomId,
            userId: req.body.userId,
            chainId: req.body.chainId
          })

          newDrawing.save().then(drawing => res.json(drawing));
        }
      })
  }
)

// PATCH a drawing backend route (BONUS)

// DELETE a drawing backend route (BONUS)

module.exports = router;


// Game Logic Potential?

// class Game {
//   constructor
//   super

//   // roomId
//   // state.entities.rooms[roomId] = roomobj
//   // roomObj = {
//     roomId:
//     size:
//     name:
//     players: [3, 2, 4, 1],
//   }

//   // create a room
//   // players: 1, 2, 3, 4
//   // players joined the room in this order: 3, 2, 4, 1
//   // this room has a players array that reads players: [3, 2, 4, 1]

//   //player 3
//   //this.chain = [3, 2, 4, 1];

//   //player 2
//   //player array from the roomobj in our state, and we're going to iterate through it
//   // and if the currentPLayerId !== the current element in the array, then we're going to shift that current element and push it back onto an array

//   //4 players

//   //this.chain = []

//   => [1, 2, 3, 4]
//   this.chain = [1, 2, 3, 4]

//   [1, 2, 3, 4]
//   [2, 3, 4, 1]

//   //player 3
//   [3, 4, 1, 2]

//   fetch the drawing:
//   with this roomId
//   and chain Id : chainObj[0]

//   post that drawing

//   assetUrl
//   chaindId: 2
//   user: 2
//   roomId: roomId

//   render ()

//   {}


// }