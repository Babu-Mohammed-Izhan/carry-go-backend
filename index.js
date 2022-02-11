import express from 'express';
import cors from 'cors';
import dealerRouter from './controller/dealer';
import driverRouter from './controller/driver';

const app = express();

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connected to MongoDB database');
  })
  .catch((err) => {
    console.log('error connecting to MongoDB: ', err.message);
  });

app.use(cors());
app.use(express.json());

app.use('/api/dealer', dealerRouter);

app.use('/api/driver', driverRouter);
