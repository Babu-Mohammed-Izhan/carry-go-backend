const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
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
  age: {
    type: Number,
    required: true,
  },
  truckno: {
    type: Number,
    required: true,
  },
  mobileno: {
    type: Number,
    required: true,
  },
  capacity: {
    type: String,
    required: true,
  },
  transporter: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  routes: {
    type: [],
    required: true,
  },
  dealers: {
    type: [],
    required: true,
  },
});

const driverModel = mongoose.model('driver', driverSchema);

module.exports = driverModel;
