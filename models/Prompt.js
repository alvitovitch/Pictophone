const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PromptSchema = new Schema({
  word: {
    type: String,
    required: true
  },
}, {
  timestamps: true
})

module.exports = mongoose.model('Prompt', PromptSchema);