import { Schema, model } from 'mongoose';

const dealerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  usename: {
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
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
});

const dealerModel = model('dealer', dealerSchema);

export default dealerModel;
