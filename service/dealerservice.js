import dealerModel from '../models/dealer.model';

const getDealers = async (from, to) => {
  const dealer = await dealerModel.find({});
  return dealer;
};

const addDealers = async (data) => {
  const dealer = new dealerModel({
    name: data.name,
    usename: data.username,
    password: data.password,
    age: data.age,
    truckno: data.truckno,
    mobileno: data.mobileno,
    capacity: data.capacity,
    transporter: data.transporter,
    experience: data.experience,
    city: data.city,
    state: data.state,
  });
  const savedDealer = await dealer.save();
  return savedDealer;
};

export { getDealers, addDealers };
