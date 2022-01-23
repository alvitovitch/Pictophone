const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
  roomId: {
    type: String,
    required: true
  },
  chains: Array
},{
  timestamps: true
})

module.exports = mongoose.model('Game', GameSchema);

// once game is fetched, we can persist it to state, access its chains array, and grab the pertinent drawings and guesses from the backend with those chain Ids

// post a GAME to backend with the roomId
// []

// patch the Game from each player's client side with their respective chainId (11, 21, 31, 41) - 1
// Our Game in the backen has an array of [10, 20, 30, 40]
// Patch our Game in the backend again, so the array reads [10, 20, 30, 40, 11, 21, 31, 41]

// chainIds as keys
// the prompt string, the drawing URL, and the guess string

//