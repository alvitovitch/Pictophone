const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DrawingSchema = new Schema({
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
  },
  assetUrl: {
    type: String,
    required: true
  }
},{
  timestamps: true
})

module.exports = mongoose.model('Drawing', DrawingSchema);