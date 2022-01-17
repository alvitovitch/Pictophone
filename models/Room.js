const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true,
    min: [2, 'A room needs at least 2 players'],
    max: [8, 'A room can only have up to 8 players'],
    // potentially needs a even number constraint
  }
},{
  timestamps: true
})

module.exports = mongoose.model('Room', RoomSchema);