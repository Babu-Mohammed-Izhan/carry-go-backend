import { Schema, model } from 'mongoose';

const driverSchema = new Schema({
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
  routes: {
    type: [],
    required: true,
  },
  dealers: {
    type: [],
    required: true,
  },
});

const driverModel = model('driver', driverSchema);

export default driverModel;
