const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const uploadRoute = require('./routes/upload');
dotenv.config({ path: './config.env' });

//Connect to DB
mongoose.connect(
  process.env.DB_CONNECTION_STRING,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log('Connected to DB')
);

//Add Middlewares
app.use(express.json());

//Add Route Middlewares
app.use('/api/v1/upload', uploadRoute);

const port = process.env.PORT || '3000';
app.listen(process.env.PORT, () => console.log('Server Works'));
