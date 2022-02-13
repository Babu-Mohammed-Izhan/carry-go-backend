import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dealerRouter from './controller/dealer.js';
import driverRouter from './controller/driver.js';

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(
    'mongodb+srv://izhan:izhan@cluster0.airbl.mongodb.net/carrygoDB?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log('connected to MongoDB database');
  })
  .catch((err) => {
    console.log('error connecting to MongoDB: ', err.message);
  });

app.use('/api/dealer', dealerRouter);

app.use('/api/driver', driverRouter);

app.listen(process.env.PORT || 3001, () => {
  console.log(`Connected to server on port ${process.env.PORT}`);
});
