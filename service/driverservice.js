const driverModel = require('../models/driver.model.js');

const getDriver = async (from, to) => {
  const driverFrom = await driverModel.find({
    'routes.from': `${from}`,
  });
  const driverTo = await driverModel.find({
    'routes.to': `${to}`,
  });

  const driver = [...driverFrom, ...driverTo];

  return driver;
};

const searchDriver = async (from, to) => {
  const driver = await driverModel.find({
    routes: {
      $elemMatch: {
        from: `${from}`,
        to: `${to}`,
      },
    },
  });
  return driver;
};

const addDriver = async (data) => {
  const driver = new driverModel({
    name: data.name,
    age: data.age,
    truckno: data.truckno,
    username: data.username,
    password: data.password,
    mobileno: data.mobileno,
    capacity: data.capacity,
    transporter: data.transporter,
    experience: data.experience,
    routes: data.routes,
    dealers: [],
  });
  const savedDriver = await driver.save();
  return savedDriver;
};

module.exports = { getDriver, addDriver, searchDriver };
