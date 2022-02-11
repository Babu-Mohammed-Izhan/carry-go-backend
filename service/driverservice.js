import driverModel from '../models/driver.model';

const getDriver = async (from, to) => {
  const driver = await driverModel.find({});
  return driver;
};

const addDriver = async (data) => {
  const driver = new driverModel({
    name: data.name,
    usename: data.username,
    password: data.password,
    mobileno: data.mobileno,
    nature: data.nature,
    weigth: data.weigth,
    quantity: data.quantity,
    routes: data.routes,
    dealers: [],
  });
  const savedDriver = await driver.save();
  return savedDriver;
};

export { getDriver, addDriver };
