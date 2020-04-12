const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');

const uploadRoute = require('./routes/upload');
dotenv.config({ path: './config.env' });

//Connect to DB
mongoose.connect(
  process.env.DB_CONNECTION_STRING,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log('Connected to DB')
);

//Add Middlewares
app.use(cors());
app.use(express.json());
app.use('/api/v1/uploaded-images', express.static('uploaded-images'));
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('Frontend/build'));

  const parentPath = path.join(__dirname, '../');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(parentPath, 'Frontend', 'build', 'index.html'));
  });
}

//Add Route Middlewares
app.use('/api/v1/upload', uploadRoute);

const port = process.env.PORT || '3000';
app.listen(process.env.PORT, () => console.log('Server Works'));
