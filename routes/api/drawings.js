const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Drawing = require('../../models/Drawing');
const passport = require('passport');

// GET all drawings backend route
router.get("/", 
  passport.authenticate('jwt', { session: false }),

  (req, res) => {
    Drawing.find()
      .sort({ date: -1 })
      .then(drawings => res.json(drawings))
      .catch(err => res.status(404).json({ nodrawingsfound: 'No drawings found' }))
})


// GET individual drawings backend route
router.get("/:drawingId",
  passport.authenticate('jwt', { session: false }),
  
  (req, res) => {
    console.log(req.params.drawingId.split(','));
    const roomId= req.params.drawingId.split(',')[0]; 
    const chainId= req.params.drawingId.split(',')[1]; 

    Drawing.find({ chainId: chainId })
      .then(drawings => {

        let drawing = drawings.filter(drawing => drawing.roomId === roomId);
        res.json(...drawing);
      })
      .then(() => console.log("second"))
      .catch(err => res.status(404).json({ nodrawingfound: 'No drawing with that chainId and roomId found' }))
  }
)

// POST a drawing backend route
router.post("/", 
  passport.authenticate('jwt', { session: false }),

  (req, res) => {

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

module.exports = router;