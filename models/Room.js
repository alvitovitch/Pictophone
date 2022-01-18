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
  },
  host: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  // Single subdocument of host player's id
  players: Array
  // Array of subdocument players
},{
  timestamps: true
})

module.exports = mongoose.model('Room', RoomSchema);