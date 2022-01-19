const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateGuessInput(data) {
  let errors = {};

  data.word = validText(data.word) ? data.word : '';

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
}