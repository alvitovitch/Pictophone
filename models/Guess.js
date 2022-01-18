const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GuessSchema = new Schema({
  word: {
    type: String,
    required: true
  },
  roomId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  chainId: {
    type: String,
    required: true
  }
},{
  timestamps: true
})

module.exports = mongoose.model('Guess', GuessSchema);