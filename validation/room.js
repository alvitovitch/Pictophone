const Validator = require('validator');
const validText = require('./valid-text');
const validNum = require('./valid-num');

module.exports = function validateRoomInput(data) {
  let errors = {};

  data.name = validText(data.name) ? data.name : '';
  data.size = validNum(parseInt(data.size)) ? parseInt(data.size) : 4;
  data.host_id = validText(data.host_id) ? data.host_id : '';

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Room name field is required';
  }

  // if (Validator.isNumeric(data.size)) {
  //   errors.size = 'Room size field is required';
  // }

  if (Validator.isEmpty(data.host_id)) {
    errors.host = 'Host field is required';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
}