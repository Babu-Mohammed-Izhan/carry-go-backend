const mongoose = require('mongoose');

const dealerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobileno: {
    type: Number,
    required: true,
  },
  nature: {
    type: String,
    required: true,
  },
  weigth: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
});

const dealerModel = mongoose.model('dealer', dealerSchema);

module.exports = dealerModel;
