/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import exp from 'express';
import { connect } from 'mongoose';
import { config } from 'dotenv';
import { userRoute } from './APIs/UserAPI.js';
import { authorRoute } from './APIs/AuthorAPI.js';
import { adminRoute } from './APIs/AdminAPI.js';
import { commonRoute } from './APIs/CommonAPI.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

config();

const app = exp();

app.use(cors({ 
  origin: ['http://localhost:5173',
  'https://blog-app-ten-tawny-77.vercel.app/', process.env.CLIENT_URL], 
  credentials: true 
}));

app.use(exp.json());
app.use(cookieParser());

app.use('/user-api', userRoute);
app.use('/author-api', authorRoute);
app.use('/admin-api', adminRoute);
app.use('/common-api', commonRoute);

const connectDB = async () => {
  try {
    await connect(process.env.DB_URL);
    console.log('DB connection success');

    const port = process.env.PORT || 4000;
    app.listen(port, () => console.log(`Server started on port ${port}`));
  } catch (err) {
    console.log('err in Db connection', err);
  }
};

connectDB();

app.use((req, res) => {
  res.status(404).json({ message: `${req.url} is invalid` });
});

app.use((err, req, res, next) => {
  console.error(err);

  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: 'Validation failed', errors: err.errors });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  if (err.code === 11000) {
    return res.status(409).json({ message: 'Duplicate field value' });
  }

  res.status(500).json({ message: 'Internal Server Error' });
});