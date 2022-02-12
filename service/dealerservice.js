import dealerModel from '../models/dealer.model.js';

const getDealers = async () => {
  const dealer = await dealerModel.find({});
  return dealer;
};

const addDealers = async (data) => {
  const dealer = new dealerModel({
    name: data.name,
    username: data.username,
    password: data.password,
    mobileno: data.mobileno,
    nature: data.nature,
    weigth: data.weigth,
    quantity: data.quantity,
    city: data.city,
    state: data.state,
  });
  const savedDealer = await dealer.save();
  return savedDealer;
};

export { getDealers, addDealers };
