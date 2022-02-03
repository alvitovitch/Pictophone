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
    min: [2, 'A room needs at least 4 players'],
    max: [8, 'A room can only have up to 8 players'],
  },
  host: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  players: Array
},{
  timestamps: true
})

module.exports = mongoose.model('Room', RoomSchema);