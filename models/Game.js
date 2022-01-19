const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = newSchema({
  roomId: {
    type: String,
    required: true
  },
  chains: Array
},{
  timestamps: true
})

module.exports = mongoose.model('Game', GameSchema);